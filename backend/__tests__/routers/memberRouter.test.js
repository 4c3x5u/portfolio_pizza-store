import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import OrderSchema from '../../models/orderModel';
import data from '../data/register.json';

const Order = mongoose.model('Order', OrderSchema);

describe('POST /members/register', () => {
  afterEach(() => {
    mockingoose(Order).reset();
  });

  it('should return validation tokens on valid register request', () => {
    expect.hasAssertions();
    mockingoose(Order)
      .toReturn({}, 'findOne')
      // eslint-disable-next-line no-sequences
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
});
