import mongoose, { Types } from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
  memberId: { type: String, default: 'Guest' },
  total: { type: Number, required: true },
  pizzas: [
    {
      toppings: [{ type: String, required: true }],
      size: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  drinks: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  sides: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
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
