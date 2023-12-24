const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    companyName: String,
    website: String,
  },
  { collection: "game_publsihers", timestamps: true }
);

// game_publishers

const Publisher = mongoose.model("Publisher", publisherSchema);

const gameSchema = new mongoose.Schema({
  title: String,
  publisher: publisherSchema,
});

const Game = mongoose.model("Game", gameSchema);

module.exports = { Publisher, Game };
