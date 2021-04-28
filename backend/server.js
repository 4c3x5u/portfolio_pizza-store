import mongoose from 'mongoose';

import app from './app';
import initialiseDatabase from './scripts/initialiseDatabase';

const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_CONNSTR,
  { useNewUrlParser: true, useUnifiedTopology: true },
);
initialiseDatabase();

app.listen(PORT, () => (
  // eslint-disable-next-line no-console
  console.log(`The pizza store server is running at ${PORT}.`)
));
