import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import OrderSchema from '../models/orderModel';

const Order = mongoose.model('Order', OrderSchema);

export const submitOrder = (req, res) => (
  !validationResult(req).isEmpty()
    ? res.status(400).json(validationResult(req).array())
    : new Order(req.body).save((err) => (
      err
        ? res.status(400).send(err)
        : res.status(200).send({ message: 'Order submitted successfully.' })
    ))
);

export const getHistory = (req, res) => (
  Order.find({ memberId: req.params.memberId }, (err, orders) => (
    err
      ? res.status(400).send(err)
      : res.status(200).send(orders)))
);
