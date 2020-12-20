import mongoose from 'mongoose'
import OrderSchema from '../models/orderModel'

const Order = mongoose.model('Order', OrderSchema)

export const submit = (req, res) =>
  new Order(req.body)
    .save((err, order) =>
      err
        ? res.status(400).send(err)
        : res.send(order)
    )

export const history = (req, res) =>
  Order.find({ memberId: req.body.memberId }, (err, orders) =>
    err
      ? res.status(400).send(err)
      : res.send(orders)
  )
