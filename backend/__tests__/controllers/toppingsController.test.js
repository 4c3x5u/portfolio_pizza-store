import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import ToppingSchema from '../../models/toppingModel';
import toppingsResponse from '../data/toppingsResponse.json';

const Topping = mongoose.model('Topping', ToppingSchema);

describe('GET /sides', () => {
  beforeAll(() => {
    mockingoose(Topping).toReturn(toppingsResponse, 'find');
  });

  afterAll(() => {
    mockingoose(Topping).reset();
  });

  it('should return the complete list of all toppings from the database', () => {
    expect.hasAssertions();
    return request(app)
      .get('/toppings')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(toppingsResponse);
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });
});
