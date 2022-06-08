const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    OrderId: {
      type: String,
      // required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: [true, "Please provide description for review"],
    },
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
    },
  },
  { timestamps: true }
);

reviewSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
reviewSchema.set("toJSON", {
  virtuals: true,
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
