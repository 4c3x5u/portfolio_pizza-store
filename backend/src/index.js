import mongoose from 'mongoose';

import app from './app';
import initialiseDatabase from './scripts/initialiseDatabase';

const PORT = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO_DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
);
initialiseDatabase();

app.listen(PORT, () => (
  // eslint-disable-next-line no-console
  console.log(`The pizza store server is running at ${PORT}.`)
));
