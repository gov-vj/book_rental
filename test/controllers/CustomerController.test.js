const request = require('supertest');
const {
  beforeAction,
  afterAction,
} = require('../setup/_setup');
const Customer = require('../../api/models/Customer');

let api;
let cust;

beforeAll(async () => {
  api = await beforeAction();
});

afterAll(() => {
  afterAction();
});

beforeEach(async () => {
  cust = await Customer.create({
    name: 'Vijay',
    mobile: 9876543211,
  });
});

afterEach(async () => {
  await cust.destroy();
});

test('Customer | create', async () => {
  const res = await request(api)
    .post('/api/customer/add')
    .set('Accept', /json/)
    .send({
      name: 'govind',
      mobile: 9876543210,
    })
    .expect(200);

  expect(res.body.id).toBeTruthy();

  const customer = await Customer.findByPk(res.body.id);

  expect(customer.id).toEqual(res.body.id);
  expect(customer.name).toEqual(res.body.name);
  expect(customer.mobile).toEqual(res.body.mobile);
  expect(res.body.name).toEqual('govind');
  expect(res.body.mobile).toEqual(9876543210);

  await customer.destroy();
});

test('Customer | create | invalid mobile number error', async () => {
  const res = await request(api)
    .post('/api/customer/add')
    .set('Accept', /json/)
    .send({
      name: 'govind',
      mobile: 1876543210,
    })
    .expect(400);

  expect(res.body).toEqual('Validation is on mobile failed');
});

test('Customer | create | dublicate mobile number', async () => {
  const res = await request(api)
    .post('/api/customer/add')
    .set('Accept', /json/)
    .send({
      name: 'govind',
      mobile: 9876543211,
    })
    .expect(400);

  expect(res.body).toEqual('mobile must be unique');
});

test('Customer | get', async () => {
  const res = await request(api)
    .get('/api/customer/get')
    .query({ name: 'Vijay' })
    .set('Accept', /json/)
    .expect(200);

  expect(res.body).toBeTruthy();
  expect(res.body.length).toEqual(1);
  expect(res.body[0].name).toEqual('Vijay');
  expect(res.body[0].mobile).toEqual(9876543211);
});

test('Customer | get all', async () => {
  const res = await request(api)
    .get('/api/customer/getAll')
    .set('Accept', /json/)
    .expect(200);

  expect(res.body).toBeTruthy();
  expect(res.body.length).toBeGreaterThanOrEqual(1);
});
