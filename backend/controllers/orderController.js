import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import OrderSchema from '../models/orderModel';

const Order = mongoose.model('Order', OrderSchema);

const submit = (req, res) => {
  const newOrder = new Order(...req.body);
  newOrder.save((dbErr, order) => (
    dbErr ? (
      res.status(400).send(dbErr)
    ) : (
      res.send(order)
    )
  ));
};

export default submit;
