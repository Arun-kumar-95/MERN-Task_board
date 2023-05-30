const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Enter name"],
    minLength: 3,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z]+ [a-zA-Z]+$/, "Enter valid name"],
  },

  userId: {
    type: String,
    lowercase: true,
    unique: ["User already taken", true],
    required: [true, "Enter valid username"],
    minLength: [6, "UserID must be of 6 character"],
  },

  password: {
    type: String,
    required: ["Enter your password", true],
    select: false,
    minLength: [6, "Password must have atleast 6 character"],
    trim: true,
  },
  phone: {
    type: Number,
    required: ["Enter mobile number", true],
    min: [6, "Number must be of 10 digit"],
    trim: true,
  },

  lists: [],
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

// METHODS

userSchema.pre("save", async function (next) {
  // create the salt
  let salt = await bcrypt.genSalt(10);
  // modify password field only is password field is changed
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, salt);
});

// matchPassword
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate token
userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
