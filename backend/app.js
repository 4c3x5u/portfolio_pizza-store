import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import memberRouter from './routers/memberRouter';
import toppingRouter from './routers/toppingRouter';
import sideRouter from './routers/sideRouter';
import drinkRouter from './routers/drinkRouter';
import orderRouter from './routers/orderRouter';

dotenv.config();

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(cors());

app.use('/member', memberRouter);
app.use('/toppings', toppingRouter);
app.use('/sides', sideRouter);
app.use('/drinks', drinkRouter);
app.use('/order', orderRouter);

export default app;
