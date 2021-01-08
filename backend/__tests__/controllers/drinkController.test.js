import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import drinks from '../data/drinks.json';
import DrinkSchema from '../../models/drinkModel';

const Drink = mongoose.model('Drink', DrinkSchema);

describe('getDrinks', () => {
  beforeAll(() => {
    mockingoose(Drink).toReturn(drinks, 'find');
  });

  it('should return the complete list of all drinks in the database', () => {
    return request(app)
      .get('/drinks')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(drinks);
      });
  });
});
