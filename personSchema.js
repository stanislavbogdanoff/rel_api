const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  passport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passport",
  },
});

const Person = mongoose.model("Person", personSchema);

const passportSchema = new mongoose.Schema({
  number: Number,
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
  },
});

const Passport = mongoose.model("Passport", passportSchema);

module.exports = { Person, Passport };
