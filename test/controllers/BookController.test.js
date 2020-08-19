const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Book = require('../../api/models/Book');

let api;
let book;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  book = await Book.create({
    title: 'Harry Potter',
    genre: 'fiction',
    price: 20,
  });
});

afterEach(async () => {
  await book.destroy();
});

test('Book | create | empty title error', async () => {
  const res = await request(api)
    .post('/api/book/add')
    .set('Accept', /json/)
    .send({
      genre: 'novel',
      price: 30,
    })
    .expect(400);

  expect(res.body).toEqual('Book.title cannot be null');
});

test('Book | create | price cannot be string', async () => {
  const res = await request(api)
    .post('/api/book/add')
    .set('Accept', /json/)
    .send({
      title: 'Game of thrones',
      genre: 'novel',
      price: 'some value',
    })
    .expect(400);

  expect(res.body).toEqual('Validation isDecimal on price failed');
});

test('Book | create', async () => {
  const res = await request(api)
    .post('/api/book/add')
    .set('Accept', /json/)
    .send({
      title: 'Game of thrones',
      genre: 'novel',
      price: 30,
    })
    .expect(200);

  expect(res.body.id).toBeTruthy();

  const novel = await Book.findByPk(res.body.id);

  expect(novel.id).toEqual(res.body.id);
  expect(novel.title).toEqual(res.body.title);
  expect(novel.genre).toEqual(res.body.genre);
  expect(novel.price).toEqual(res.body.price);
  expect(res.body.title).toEqual('Game of thrones');
  expect(res.body.genre).toEqual('novel');
  expect(res.body.price).toEqual(30);

  await novel.destroy();
});

test('Book | get', async () => {
  const res = await request(api)
    .get('/api/book/get')
    .query({ title: 'Harry Potter' })
    .set('Accept', /json/)
    .expect(200);

  expect(res.body).toBeTruthy();
  expect(res.body.length).toEqual(1);
  expect(res.body[0].title).toEqual('Harry Potter');
  expect(res.body[0].genre).toEqual('fiction');
  expect(res.body[0].price).toEqual(20);
});

test('Book | get all', async () => {
  const res = await request(api)
    .get('/api/book/getAll')
    .set('Accept', /json/)
    .expect(200);

  expect(res.body).toBeTruthy();
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});
