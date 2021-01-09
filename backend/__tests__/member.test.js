/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import mongoose from 'mongoose';
import mockingoose from 'mockingoose';
import bcrypt from 'bcrypt';

import app from '../app';
import MemberSchema from '../models/memberModel';
import member from './data/member.json';

const Member = mongoose.model('Member', MemberSchema);

describe('POST /members/register', () => {
  afterEach(() => mockingoose(Member).reset());

  it('should return validation tokens for a valid request', () => {
    expect.hasAssertions();
    return request(app)
      .post('/members/register')
      .send(member.register.validRequest)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.user).not.toBeNull();
        bcrypt.compare(
          member.register.validRequest.password,
          response.body.token,
          (hashErr, same) => { expect(hashErr).toBeUndefined(); expect(same).toBe(true); },
        );
      })
      .catch((error) => { expect(error).toBeUndefined(); });
  });

  it('should return the correct array of validation messages for an invalid request', () => {
    expect.hasAssertions();
    mockingoose(Member)
      .toReturn(undefined, 'findOne')
      .toReturn((false, member.register.validResponse), 'save');
    return request(app)
      .post('/members/register')
      .send(member.register.invalidRequest)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual([
          { message: 'Email format is invalid.' },
          { message: 'Password confirmation must be 8 to 35 characters long.' },
          { message: 'Password confirmation does not match password.' },
        ]);
      })
      .catch((error) => { expect(error).toBeUndefined(); });
  });

  it('should return database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(new Error(), 'save');
    return request(app)
      .post('/members/register')
      .send(member.register.validRequest)
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.body).toStrictEqual({ message: 'Failed to save member to the database.' });
      })
      .catch((error) => { expect(error).toBeUndefined(); });
  });
});

describe('POST /members/sign-in', () => {
  afterEach(() => mockingoose(Member).reset());

  it('should return validation tokens for a valid request', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(member.signIn.validResponse, 'findOne');
    return request(app)
      .post('/members/sign-in')
      .send(member.signIn.validRequest)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({
          user: member.signIn.validResponse._id,
          token: member.signIn.validResponse.password,
        });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return the correct array of validation messages for an invalid request', () => {
    expect.hasAssertions();
    return request(app)
      .post('/members/sign-in')
      .send(member.signIn.invalidRequest)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toStrictEqual([
          { message: 'Email format is invalid.' },
          { message: 'Password must be 8 to 35 characters long.' },
        ]);
      })
      .catch((error) => { expect(error).toBeUndefined(); });
  });
});

describe('POST /members/validate-token', () => {
  afterEach(() => {});

  it('should return success message for a valid request', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(member.validateToken.validResponse, 'findOne');
    return request(app)
      .post('/members/validate-token')
      .send(member.validateToken.validRequest)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({ message: 'Token validation success.' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });
});
