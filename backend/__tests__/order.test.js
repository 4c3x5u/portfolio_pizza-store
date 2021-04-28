import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import OrderSchema from '../models/orderModel';
import order from './data/order.json';

const Order = mongoose.model('Order', OrderSchema);

describe('POST /order', () => {
  afterEach(() => {
    mockingoose(Order).reset();
  });

  it('should return a success message on valid order submission', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(undefined, 'save');
    return request(app)
      .post('/order')
      .send(order.validRequest)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ msg: 'Order submitted successfully.' });
      });
  });

  it('should return an array of correct validation error messages on invalid order submission', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(undefined, 'save');
    return request(app)
      .post('/order')
      .send({
        ...order.validRequest,
        paymentDetails: { ...order.validRequest.paymentDetails, cardNumber: undefined },
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual([
          { msg: 'Card number must not be empty.' },
          { msg: 'Invalid card number.' },
        ]);
      })
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return a database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(new Error(), 'save');
    return request(app)
      .post('/order')
      .send(order.validRequest)
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toStrictEqual([{ msg: 'Failed to save order to the database.' }]);
      })
      .catch((err) => expect(err).toBeUndefined());
  });
});

describe('GET /order/history/:memberId', () => {
  afterEach(() => {
    mockingoose(Order).reset('save');
  });

  it('should return the history of orders for a valid member ID', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(order.validResponse, 'find');
    return request(app)
      .get('/order/history/4fa54264d372a605a82a200d')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(order.validResponse);
      })
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return an array of correct validation error messages for invalid memberId', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(order.validResponse, 'find');
    return request(app)
      .get('/order/history/invalid')
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual([{ msg: 'Invalid member ID.' }]);
      })
      .catch((err) => expect(err).toBeUndefined());
  });

  it('should return a database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(new Error('Whoops'), 'find');
    return request(app)
      .get('/order/history/4fa54264d372a605a82a200d')
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toStrictEqual([{ msg: 'Failed to get order history from the database.' }]);
      })
      .catch((err) => expect(err).toBeUndefined());
  });
});
