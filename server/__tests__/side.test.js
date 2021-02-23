import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';

import app from '../app';
import SideSchema from '../models/sideModel';
import side from './data/side.json';

const Side = mongoose.model('Side', SideSchema);

describe('GET /sides', () => {
  afterEach(() => { mockingoose(Side).reset(); });

  it('should return the complete list of all sides from the database', () => {
    expect.hasAssertions();
    mockingoose(Side).toReturn(side.validResponse, 'find');
    return request(app)
      .get('/sides')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual(side.validResponse);
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return a database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Side).toReturn(new Error(), 'find');
    return request(app)
      .get('/sides')
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toStrictEqual({ msg: 'Failed to get sides from the database.' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });
});
