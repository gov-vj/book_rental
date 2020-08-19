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

test('BookIssue | create | regular', async () => {
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
  expect(dsaIssued.rent).toEqual(18);
  expect(dsaIssued.advanced).toEqual(0.0);
  expect(dsaIssued.isReturned).toEqual(false);
  expect(dsaIssued.BookId).toEqual(book.id);
  expect(dsaIssued.CustomerId).toEqual(cust.id);
  expect(res.body.due_for).toEqual(12);
  expect(res.body.rent).toEqual(18);
  expect(res.body.advanced).toEqual(0.0);
  expect(res.body.isReturned).toEqual(false);
  expect(res.body.BookId).toEqual(book.id);
  expect(res.body.CustomerId).toEqual(cust.id);

  await dsaIssued.destroy();
});

test('BookIssue | create | fiction', async () => {
  const fiction = await Book.create({
    title: 'DSA',
    price: 5,
    genre: 'fiction',
  });

  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: fiction.id,
      cid: cust.id,
      due: 12,
    })
    .expect(200);

  expect(res.body.id).toBeTruthy();

  const fictionDb = await Issued.findByPk(res.body.id);

  expect(fictionDb.due_for).toEqual(12);
  expect(fictionDb.rent).toEqual(36);
  expect(fictionDb.advanced).toEqual(0.0);
  expect(fictionDb.isReturned).toEqual(false);
  expect(fictionDb.BookId).toEqual(fiction.id);
  expect(fictionDb.CustomerId).toEqual(cust.id);
  expect(res.body.due_for).toEqual(12);
  expect(res.body.rent).toEqual(36);
  expect(res.body.advanced).toEqual(0.0);
  expect(res.body.isReturned).toEqual(false);
  expect(res.body.BookId).toEqual(fiction.id);
  expect(res.body.CustomerId).toEqual(cust.id);

  await fictionDb.destroy();
  await fiction.destroy();
});

test('BookIssue | create | novel', async () => {
  const novel = await Book.create({
    title: 'DSA',
    price: 5,
    genre: 'novel',
  });

  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: novel.id,
      cid: cust.id,
      due: 12,
    })
    .expect(200);

  expect(res.body.id).toBeTruthy();

  const novelDb = await Issued.findByPk(res.body.id);

  expect(novelDb.due_for).toEqual(12);
  expect(novelDb.rent).toEqual(18);
  expect(novelDb.advanced).toEqual(0.0);
  expect(novelDb.isReturned).toEqual(false);
  expect(novelDb.BookId).toEqual(novel.id);
  expect(novelDb.CustomerId).toEqual(cust.id);
  expect(res.body.due_for).toEqual(12);
  expect(res.body.rent).toEqual(18);
  expect(res.body.advanced).toEqual(0.0);
  expect(res.body.isReturned).toEqual(false);
  expect(res.body.BookId).toEqual(novel.id);
  expect(res.body.CustomerId).toEqual(cust.id);

  await novelDb.destroy();
  await novel.destroy();
});

test('BookIssue | create | invalid genre', async () => {
  const customBook = await Book.create({
    title: 'DSA',
    price: 5,
    genre: 'custom genre',
  });

  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: customBook.id,
      cid: cust.id,
      due: 12,
    })
    .expect(400);

  expect(res.body).toEqual('Rent object is not created. Invalid genre type. [genre=custom genre]');
  // await customBook.destroy();
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
    .expect(400);

  expect(res.body).toEqual('Book does not exist');
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

  expect(res.body).toEqual('Due is not an integer');
});

test('BookIssue | create | due day is null', async () => {
  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: book.id,
      cid: cust.id,
    })
    .expect(400);

  expect(res.body).toEqual('Due is empty');
});

test('BookIssue | create | book id is not an integer', async () => {
  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      bid: 'book id',
      cid: cust.id,
      due: 12,
    })
    .expect(400);

  expect(res.body).toEqual('Book id is not an integer');
});

test('BookIssue | create | book id is null', async () => {
  const res = await request(api)
    .post('/api/issue/calCharges')
    .set('Accept', /json/)
    .send({
      cid: cust.id,
      due: 12,
    })
    .expect(400);

  expect(res.body).toEqual('Book id is empty');
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
