import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
  total: { type: Number, required: false },
  submitted: { type: Boolean, required: false },
  points: { type: Number, required: false },
  memberId: { type: String, required: false },
  pizzas: [ 
    {
      type: {
        id: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
      required: true,
    },
  ],
  drinks: [ 
    { 
      type: {
        id: { type: String, required: true },
        quantity: { type: Number, required: false }, 
      },
      required: false,
    },
  ],
  sides: [ 
    {
      type: {
        id: { type: String, required: true },
        quantity: { type: Number, required: false },
      },
      required: false,
    },
  ],
  paymentDetails: { 
    type: {
      accountNumber: { type: String, required: true },
      sortCode: { type: String, required: true },
      securityCode: { type: String, required: true },
      addressId: { type: String, required: true },
    },
    required: false,
  },
  address: {
    type: {
      firstLine: { type: String, required: true },
      secondLine: { type: String, required: false },
      postcode: { type: String, required: true },
    },
    required: true
  },
  phoneNumber: { type: String, required: true },
});

export default OrderSchema;