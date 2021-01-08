import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import DrinkSchema from '../../models/drinkModel';
import drinksResponse from '../data/drinksResponse.json';

const Drink = mongoose.model('Drink', DrinkSchema);

describe('getDrinks', () => {
  beforeAll(() => {
    mockingoose(Drink).toReturn(drinksResponse, 'find');
  });

  it('should return the complete list of all drinks from the database', () => {
    expect.hasAssertions();
    return request(app)
      .get('/drinks')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(drinksResponse);
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });
});
