const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  cars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const User = mongoose.model("User", userSchema);

const carSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Car = mongoose.model("Car", carSchema);
