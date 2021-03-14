import mongoose, { Schema } from "mongoose";
const { ObjectId } = Schema;

const orderSchema = new Schema(
  {
    hotel: {
      type: ObjectId,
      ref: "Hotel",
    },
    session: {},
    orderedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
