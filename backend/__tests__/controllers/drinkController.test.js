import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { connectionString } from '../../.secrets/mongo.json';
import { getDrinks } from '../../controllers/drinkController';
import drinks from '../data/drinks.json';

const mockgoose = new Mockgoose(mongoose);

beforeAll(() => {
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(connectionString);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

describe('getDrinks', () => {
  it('should return the complete list of all drinks in the database', () => {
    return getDrinks()
      .then((response) => {
        expect(response).toStrictEqual({
          status: 200,
          data: drinks,
        });
      })
      .catch((error) => expect(error).toBeUndefined());
  });
});
