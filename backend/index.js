import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';

import membersRouter from './routers/membersRouter';
import toppingRouter from './routers/toppingsRouter';
import sideRouter from './routers/sidesRouter';
import drinksRouter from './routers/drinksRouter';

const server = express();
const PORT = 4000;

// mongo connection
// eslint-disable-next-line no-undef
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pizzaStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// bodyparser setup
server.use(bodyparser.urlencoded({ extended: true }));
server.use(bodyparser.json());

// CORS setup
server.use(cors());

// Routes
server.use('/toppings', toppingRouter);
server.use('/side', sideRouter);
server.use('/drinks', drinksRouter);
server.use('/members', membersRouter);

server.get('/', (req, res) => res.send(`The pizza store server is running at ${PORT}.`));

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`The pizza store server is running at ${PORT}.`));
