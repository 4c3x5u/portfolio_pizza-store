import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import DrinkSchema from '../models/drinkModel';
import drinkData from './data/drink.json';

const Drink = mongoose.model('Drink', DrinkSchema);

describe('GET /drinks', () => {
  afterEach(() => mockingoose(Drink).reset());

  it('should return the complete list of all drinks from the database', () => {
    expect.hasAssertions();
    mockingoose(Drink).toReturn(drinkData.validResponse, 'find');
    return request(app)
      .get('/drinks')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(drinkData.validResponse);
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return a database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Drink).toReturn(new Error(), 'find');
    return request(app)
      .get('/drinks')
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toStrictEqual({ msg: 'Failed to get drinks from the database.' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });
});
