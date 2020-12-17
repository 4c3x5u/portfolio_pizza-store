import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import cors from 'cors';

import memberRouter from './routers/memberRouter';
import toppingRouter from './routers/toppingRouter';
import sideRouter from './routers/sideRouter';
import drinkRouter from './routers/drinkRouter';

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
server.use('/sides', sideRouter);
server.use('/drinks', drinkRouter);
server.use('/members', memberRouter);

server.get('/', (req, res) => res.send(`The pizza store server is running at ${PORT}.`));

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`The pizza store server is running at ${PORT}.`));
