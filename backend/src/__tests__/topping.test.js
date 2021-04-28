import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import ToppingSchema from '../models/toppingModel';
import topping from './data/topping.json';

const Topping = mongoose.model('Topping', ToppingSchema);

describe('GET /sides', () => {
  afterEach(() => {
    mockingoose(Topping).reset();
  });

  it('should return the complete list of all toppings from the database', () => {
    expect.hasAssertions();
    mockingoose(Topping).toReturn(topping.validResponse, 'find');
    return request(app)
      .get('/toppings')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(topping.validResponse);
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return a database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Topping).toReturn(new Error(), 'find');
    return request(app)
      .get('/toppings')
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toStrictEqual({ msg: 'Failed to get toppings from the database' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });
});
