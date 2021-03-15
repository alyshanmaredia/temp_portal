const mongoose = require("mongoose");

const Agent_Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Enter Name: "],
      trim: true,
    },
    emailAddress: {
      type: String,
      require: [true, "Enter Email Address: "],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Enter Password: "],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    displayImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Agents", Agent_Schema);
