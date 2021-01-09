import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import SideSchema from '../models/sideModel';
import sidesResponse from './data/sidesResponse.json';

const Side = mongoose.model('Side', SideSchema);

describe('GET /sides', () => {
  afterEach(() => {
    mockingoose(Side).reset();
  });

  it('should return the complete list of all sides from the database', () => {
    expect.hasAssertions();
    mockingoose(Side).toReturn(sidesResponse, 'find');
    return request(app)
      .get('/sides')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(sidesResponse);
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
        expect(response.body).toStrictEqual({ message: 'Failed to get sides from the database.' });
      })
      .catch((error) => {
        expect(error).toBeUndefined();
      });
  });
});
