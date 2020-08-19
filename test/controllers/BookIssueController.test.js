const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Book = require('../../api/models/Book');
const Customer = require('../../api/models/Customer');
const Issued = require('../../api/models/Issued');

let api;
let book;
let cust;
let bookIssued;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  book = await Book.create({
    title: 'DSA',
    price: 5,
  });

  cust = await Customer.create({
    name: 'Kartik',
    mobile: 9876543213,
  });

  bookIssued = await Issued.create({
    BookId: book.id,
    CustomerId: cust.id,
    rent: 25,
    due_for: 3,
  });
});

afterEach(async () => {
  await bookIssued.destroy();
  await book.destroy();
  await cust.destroy();
});

test('BookIssue | create', async () => {
  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: book.id,
      cid: cust.id,
      due: 12,
    })
    .expect(200);

  expect(res.body.id).toBeTruthy();

  const dsaIssued = await Issued.findByPk(res.body.id);

  expect(dsaIssued.due_for).toEqual(12);
  expect(dsaIssued.rent).toEqual(12);
  expect(dsaIssued.advanced).toEqual(0.0);
  expect(dsaIssued.isReturned).toEqual(false);
  expect(dsaIssued.BookId).toEqual(book.id);
  expect(dsaIssued.CustomerId).toEqual(cust.id);
  expect(res.body.due_for).toEqual(12);
  expect(res.body.rent).toEqual(12);
  expect(res.body.advanced).toEqual(0.0);
  expect(res.body.isReturned).toEqual(false);
  expect(res.body.BookId).toEqual(book.id);
  expect(res.body.CustomerId).toEqual(cust.id);

  await dsaIssued.destroy();
});

test('BookIssue | create | invalid book id', async () => {
  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: 200,
      cid: cust.id,
      due: 12,
    })
    .expect(500);

  expect(res.body).toEqual('Internal server error');
});

test('BookIssue | create | invalid cust id', async () => {
  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: book.id,
      cid: 200,
      due: 12,
    })
    .expect(500);

  expect(res.body).toEqual('Internal server error');
});

test('BookIssue | create | due day is not an integer', async () => {
  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: book.id,
      cid: cust.id,
      due: 12.6,
    })
    .expect(400);

  expect(res.body).toEqual('Validation isInt on due_for failed');
});

test('BookIssue | return', async () => {
  const res = await request(api)
    .put(`/api/issue/return/${bookIssued.id}`)
    .set('Accept', /json/)
    .expect(200);

  expect(res.body).toBeTruthy();
  const bi = await Issued.findByPk(bookIssued.id);
  expect(bi.isReturned).toEqual(true);
});

test('BookIssue | return | invalid book issue id', async () => {
  const res = await request(api)
    .put('/api/issue/return/200')
    .set('Accept', /json/)
    .expect(200);

  expect(res.body[0]).toEqual(0);
});

test('BookIssue | get', async () => {
  const res = await request(api)
    .get('/api/issue/get')
    .query({ bid: book.id, cid: cust.id })
    .set('Accept', /json/)
    .expect(200);

  expect(res.body).toBeTruthy();
  expect(res.body.length).toEqual(1);
  expect(res.body[0].due_for).toEqual(3);
  expect(res.body[0].rent).toEqual(25);
  expect(res.body[0].advanced).toEqual(0.0);
  expect(res.body[0].isReturned).toEqual(false);
  expect(res.body[0].BookId).toEqual(book.id);
  expect(res.body[0].CustomerId).toEqual(cust.id);
});

test('BookIssue | get all', async () => {
  const res = await request(api)
    .get('/api/issue/getAll')
    .set('Accept', /json/)
    .expect(200);

  expect(res.body).toBeTruthy();
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});
