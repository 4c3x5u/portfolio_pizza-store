import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import OrderSchema from '../../models/orderModel';
import orderRequest from '../data/orderRequest.json';
import orderResponse from '../data/orderResponse.json';

const Order = mongoose.model('Order', OrderSchema);

describe('POST /order', () => {
  afterEach(() => {
    mockingoose(Order).reset('save');
  });

  it('should return a success message on valid order submission', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn({}, 'save');
    return request(app)
      .post('/order')
      .send(orderRequest)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ message: 'Order submitted successfully.' });
      });
  });

  it('should return an array of correct validation error messages on invalid order submission', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(undefined, 'save');
    return request(app)
      .post('/order')
      .send({ ...orderRequest, memberId: undefined })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual([
          { message: 'Member ID must not be empty.' },
          { message: 'Invalid member ID.' },
        ]);
      })
      .catch((error) => expect(error).toBeUndefined());
  });

  it('should return a "Database failure." message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(new Error('Whoops'), 'save');
    return request(app)
      .post('/order')
      .send(orderRequest)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual({ message: 'Database failure.' });
      })
      .catch((err) => expect(err.message).toBeUndefined());
  });
});

describe('GET /order/history/:memberId', () => {
  afterEach(() => {
    mockingoose(Order).reset('save');
  });

  it('should return the history of orders for a valid member ID', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(orderResponse, 'find');
    return request(app)
      .get('/order/history/4fa54264d372a605a82a200d')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(orderResponse);
      })
      .catch((error) => expect(error).toBeUndefined());
  });

  it('should return an array of correct validation error messages for invalid memberId', () => {
    expect.hasAssertions();
    mockingoose(Order).toReturn(orderResponse, 'find');
    return request(app)
      .get('/order/history/invalid')
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual([{ message: 'Invalid member ID.' }]);
      })
      .catch((error) => expect(error).toBeUndefined());
  });
});
