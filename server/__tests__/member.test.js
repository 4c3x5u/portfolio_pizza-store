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
  afterEach(() => { mockingoose(Member).reset(); });

  it('should return validation tokens for a valid request', () => {
    expect.hasAssertions();
    return request(app)
      .post('/members/register')
      .send(member.register.validRequest)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.user).not.toBeNull();
        bcrypt.compare(
          member.register.validRequest.password,
          res.body.token,
          (hashErr, same) => { expect(hashErr).toBeUndefined(); expect(same).toBe(true); },
        );
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return the correct array of validation messages for an invalid request', () => {
    expect.hasAssertions();
    mockingoose(Member)
      .toReturn(undefined, 'findOne')
      .toReturn(member.register.validResponse, 'save');
    return request(app)
      .post('/members/register')
      .send(member.register.invalidRequest)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual([
          { msg: 'Email format is invalid.' },
          { msg: 'Password confirmation must be 8 to 35 characters long.' },
          { msg: 'Password confirmation does not match password.' },
        ]);
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return database failure message on mongoose error', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(new Error(), 'save');
    return request(app)
      .post('/members/register')
      .send(member.register.validRequest)
      .then((res) => {
        expect(res.status).toBe(500);
        expect(res.body).toStrictEqual({ msg: 'Failed to save member to the database.' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });
});

describe('POST /members/sign-in', () => {
  afterEach(() => { mockingoose(Member).reset(); });

  it('should return validation tokens for a valid request', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(member.signIn.validResponse, 'findOne');
    return request(app)
      .post('/members/sign-in')
      .send(member.signIn.validRequest)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({
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
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual([
          { msg: 'Email format is invalid.' },
          { msg: 'Password must be 8 to 35 characters long.' },
        ]);
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });
});

describe('POST /members/validate-token', () => {
  afterEach(() => { mockingoose(Member).reset(); });

  it('should return success message for a valid request', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(member.validateToken.validResponse, 'findOne');
    return request(app)
      .post('/members/validate-token')
      .send(member.validateToken.validRequest)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toStrictEqual({ msg: 'Token validation success.' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return the correct list of validation error messages on invalid request', () => {
    expect.hasAssertions();
    return request(app)
      .post('/members/validate-token')
      .send(member.validateToken.invalidRequest)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual([
          { msg: 'User contains invalid characters.' },
          { msg: 'Token must not be empty.' },
          { msg: 'Token contains invalid characters.' },
        ]);
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return a member not found message if findOne doesn\'t return a member', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(undefined, 'findOne');
    return request(app)
      .post('/members/validate-token')
      .send(member.validateToken.validRequest)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual({ msg: 'Member not found.' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });

  it('should return an invalid token message if the token do not match the hashed password', () => {
    expect.hasAssertions();
    mockingoose(Member).toReturn(member.validateToken.invalidResponse, 'findOne');
    return request(app)
      .post('/members/validate-token')
      .send(member.validateToken.validRequest)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toStrictEqual({ msg: 'Invalid authentication token.' });
      })
      .catch((err) => { expect(err).toBeUndefined(); });
  });
});
