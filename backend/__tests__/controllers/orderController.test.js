import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import OrderSchema from '../../models/orderModel';
import orderRequest from '../data/orderRequest.json';

const Order = mongoose.model('Order', OrderSchema);

describe('submitOrder', () => {
  beforeAll(() => {
    mockingoose(Order).toReturn(undefined, 'save');
  });

  afterAll(() => {
    mockingoose(Order).reset();
  });

  it('should return a success message on valid order submission', () => {
    expect.hasAssertions();
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
});
