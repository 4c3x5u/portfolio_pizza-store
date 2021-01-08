import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../app';
import { connectionString } from '../../.secrets/mongo.json';
import drinks from '../data/drinks.json';

describe('getDrinks', () => {
  beforeAll(() => {
    mongoose.connect(connectionString);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should return the complete list of all drinks in the database', () => (
    request(app)
      .get('/drinks')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(drinks);
      })
  ));
});
