import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const OrderSchema = new mongoose.Schema(
  {
    product: [{
      productId: { type: String, required: true, unique: true },
      quantity: { type: Number, default: 1 },
      price: { type: Number }
    }],
    userId: {
      type: String,
      required: true,
    },
    shippingAdressId: {
      type: String,
      required: true,
    },
    billingAdressId: {
      type: Number, 
      required:true
    },
    paid: {
      type: Boolean,
      default:true
    },
    status: {
      type: String,
      default: "pending",
    },
    deliveryType: {
      type: String
    },
    tax: {
      type: Number,
      default:500
    },
    shippingCost: {
      type: Number,
      default: 25000
    },
    total: {
      type: Number
    },
    activity: {
      type: String,
      default: "Visa"
    },
    paymentType: {
      type: String,
      default: "Paypal",
      required:true
    }
  },
  { timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("Order", OrderSchema);

export default Order;