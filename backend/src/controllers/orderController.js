import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import OrderSchema from '../models/orderModel';

const Order = mongoose.model('Order', OrderSchema);

export const submitOrder = (req, res) => (!validationResult(req).isEmpty()
  ? res.status(400).send(validationResult(req).array().map((err) => ({ msg: err.msg })))
  : new Order(req.body).save((err) => (err
    ? res.status(500).send([{ msg: 'Failed to save order to the database.' }])
    : res.status(200).send({ msg: 'Order submitted successfully.' })
  ))
);

export const getHistory = (req, res) => (!validationResult(req).isEmpty()
  ? res.status(400).send(validationResult(req).array().map((err) => ({ msg: err.msg })))
  : Order.find({ memberId: req.params.memberId }, (err, orders) => (err
    ? res.status(500).send([{ msg: 'Failed to get order history from the database.' }])
    : res.status(200).send(orders)
  ))
);
