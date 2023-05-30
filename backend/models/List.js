const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  listname: {
    type: String,
    required: [true, "Enter list name"],
    trim: true,
    lowercase: true,
    minLength: [3, "Enter valid list name"],
  },

  items: [
    {
      item: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

module.exports = mongoose.model("Lists", listSchema);
