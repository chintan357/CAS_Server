const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name of food item"],
    },
    price: {
      type: String,
      required: [true, "Please enter a price of food item"],
    },
    imgUrl: {
      type: String,
      required: [true, "Please enter a image url"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter total products in stock"],
      default: 20,
    },
    available: {
      type: Boolean,
      default: false,
    },
    timesOrdered: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Duplicate the ID field.
productSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set("toJSON", {
  virtuals: true,
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
