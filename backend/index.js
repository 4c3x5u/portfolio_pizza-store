import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';

import memberRouter from './routers/memberRouter';
import toppingRouter from './routers/toppingRouter';
import sideRouter from './routers/sideRouter';
import drinkRouter from './routers/drinkRouter';
import orderRouter from './routers/orderRouter';

import { connectionString } from './.secrets/mongo.json';
import initialiseDatabase from './scripts/initialiseDatabase';

const server = express();
const PORT = 4000;

mongoose.Promise = global.Promise;
mongoose.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
);
initialiseDatabase();

server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());

server.use(cors());

server.use('/members', memberRouter);
server.use('/toppings', toppingRouter);
server.use('/sides', sideRouter);
server.use('/drinks', drinkRouter);
server.use('/order', orderRouter);

server.get('/', (req, res) => (
  res.send(`The pizza store server is running at ${PORT}.`)
));

server.listen(PORT, () => (
  console.log(`The pizza store server is running at ${PORT}.`)
));
