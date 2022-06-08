const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter an username"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    profileUrl: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/react-custom-hook-b5f7a.appspot.com/o/profileImages%2F1650973802707imgdefault_user.svg?alt=media&token=caf55f37-c852-484a-b141-f53fcc486228",
    },
    totalSpending: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

// Duplicate the ID field.
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
