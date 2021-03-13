import mongoose from 'mongoose';

import app from './app';
import { connectionString } from './.secrets/mongo.json';
import initialiseDatabase from './scripts/initialiseDatabase';

const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
);
initialiseDatabase();

app.listen(PORT, () => (
  // eslint-disable-next-line no-console
  console.log(`The pizza store server is running at ${PORT}.`)
));
