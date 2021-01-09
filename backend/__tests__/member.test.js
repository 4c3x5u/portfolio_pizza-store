import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import OrderSchema from '../models/orderModel';
import data from './data/register.json';

const Order = mongoose.model('Order', OrderSchema);

describe('POST /members/register', () => {
  afterEach(() => {
    mockingoose(Order).reset();
  });

  it('should return validation tokens for a valid request', () => {
    expect.hasAssertions();
    mockingoose(Order)
      .toReturn(undefined, 'findOne')
      .toReturn((false, data.successResponse), 'save');
    return request(app)
      .post('/members/register')
      .send(data.validRequest)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.user).not.toBeNull();
        expect(response.body.token).not.toBeNull();
      })
      .catch((error) => { expect(error).toBeUndefined(); });
  });

  it('should return the correct array of validation messages for an invalid request', () => {
    expect.hasAssertions();
    mockingoose(Order)
      .toReturn(undefined, 'findOne')
      .toReturn((false, data.successResponse), 'save');
    return request(app)
      .post('/members/register')
      .send(data.invalidRequest)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual([
          { message: 'Email format is invalid.' },
          { message: 'Password confirmation must be 8 to 35 characters long.' },
          { message: 'Password confirmation does not match password.' },
        ]);
      })
      .catch((error) => { expect(error).toBeUndefined(); });
  });
});
