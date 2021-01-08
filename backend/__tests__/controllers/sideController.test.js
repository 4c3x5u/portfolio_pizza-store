import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../../app';
import SideSchema from '../../models/sideModel';
import sidesResponse from '../data/sidesResponse.json';

const Side = mongoose.model('Side', SideSchema);

describe('getSides', () => {
  beforeAll(() => {
    mockingoose(Side).toReturn(sidesResponse, 'find');
  });

  it('should return the complete list of all sides from the database', () => {
    expect.hasAssertions();
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
});
