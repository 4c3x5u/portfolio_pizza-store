import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import DrinkSchema from '../../models/drinkModel';
import drinksResponse from '../data/drinksResponse.json';

const Drink = mongoose.model('Drink', DrinkSchema);

describe('GET /drinks', () => {
  afterEach(() => {
    mockingoose(Drink).reset();
  });

  it('should return the complete list of all drinks from the database', () => {
    expect.hasAssertions();
    mockingoose(Drink).toReturn(drinksResponse, 'find');
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

  it('should return the complete list of all drinks from the database', () => {
    expect.hasAssertions();
    mockingoose(Drink).toReturn(new Error(), 'find');
    return request(app)
      .get('/drinks')
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({ message: 'Failed to get drinks from the database.' });
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });
});
