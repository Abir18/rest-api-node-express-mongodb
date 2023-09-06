const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
      // required: [true, "Please enter a product name"]
    },
    quantity: {
      type: Number,
      required: true,
      default: 0
    },
    image: {
      type: String,
      required: false
    }
  },
  {timestamps: true}
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
