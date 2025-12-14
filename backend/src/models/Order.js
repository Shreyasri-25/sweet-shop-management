const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        sweet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sweet",
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ SAFE EXPORT (prevents overwrite error)
module.exports =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
