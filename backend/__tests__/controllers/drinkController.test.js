import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import request from 'supertest';

import app from '../../app';
import { connectionString } from '../../.secrets/mongo.json';
import drinks from '../data/drinks.json';

const mockgoose = new Mockgoose(mongoose);

describe('getDrinks', () => {
  beforeAll(() => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect(connectionString);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('should return the complete list of all drinks in the database', (done) => (
    request(app)
      .get('/drinks')
      .then((response) => {
        expect(response.status).toBe(200);
        // console.log('response.body:', response.body);
        // console.log('drinks:', drinks);
        expect(response.body).toStrictEqual(drinks);
        // console.log(response.body);
        done();
      })
      .catch((error) => {
        console.error(error);
        done();
      })
  ));
});
