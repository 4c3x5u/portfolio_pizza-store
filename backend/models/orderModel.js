import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

const Pizza = new Schema({
  type: {
    size: { type: String, required: true },
    toppings: [{ type: Types.ObjectId, required: true }],
  },
  required: false,
});

const OrderSchema = new Schema({
  memberId: Types.ObjectId,
  total: { type: Number, required: true },
  pizzas: [{
    size: { type: String, required: true },
    toppings: [{ type: Types.ObjectId, required: true }],
  }],
  drinks: [{
    size: { type: String, required: true },
    toppings: [{ type: String, required: true }],
    price: { type: Number, required: true },
  }],
  sides: [{
    id: { type: Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
  }],
  paymentDetails: {
    type: {
      cardNumber: { type: String, required: true },
      expiryDate: { type: String, required: true },
      securityCode: { type: String, required: true },
    },
    required: true,
  },
  address: {
    type: {
      firstLine: { type: String, required: true },
      secondLine: String,
      postcode: { type: String, required: true },
    },
    required: true,
  },
  phoneNumber: { type: String, required: true },
});

export default OrderSchema;
