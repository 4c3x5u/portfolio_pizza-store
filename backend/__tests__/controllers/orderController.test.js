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
      .send(orderRequest.valid)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ message: 'Order submitted successfully.' });
      });
  });
});
