import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import ToppingSchema from '../models/toppingModel';
import toppingsResponse from './data/toppingsResponse.json';

const Topping = mongoose.model('Topping', ToppingSchema);

describe('GET /sides', () => {
  afterEach(() => {
    mockingoose(Topping).reset();
  });

  it('should return the complete list of all toppings from the database', () => {
    expect.hasAssertions();
    mockingoose(Topping).toReturn(toppingsResponse, 'find');
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

  it('should return a database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Topping).toReturn(new Error(), 'find');
    return request(app)
      .get('/toppings')
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({ message: 'Failed to get toppings from the database' });
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });
});
