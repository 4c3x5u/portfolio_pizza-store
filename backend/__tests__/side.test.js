import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import SideSchema from '../models/sideModel';
import side from './data/side.json';

const Side = mongoose.model('Side', SideSchema);

describe('GET /sides', () => {
  afterEach(() => {
    mockingoose(Side).reset();
  });

  it('should return the complete list of all sides from the database', () => {
    expect.hasAssertions();
    mockingoose(Side).toReturn(side.validResponse, 'find');
    return request(app)
      .get('/sides')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(side.validResponse);
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });

  it('should return a database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Side).toReturn(new Error(), 'find');
    return request(app)
      .get('/sides')
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({ msg: 'Failed to get sides from the database.' });
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });
});
