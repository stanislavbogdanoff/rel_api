const express = require("express");
const app = express();
const { Publisher, Game } = require("./gameSchema");
const { Car, Driver } = require("./carSchema");

const mongoose = require("mongoose");
const { Person, Passport } = require("./personSchema");
const { Post, Comment } = require("./postSchema");
const { Film, Actor } = require("./filmSchema");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.gvrgdak.mongodb.net/test_db?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.status(200).json("Success");
});

app.post("/games", async (req, res) => {
  const newPublisher = new Publisher({
    companyName: "Ubisoft",
    website: "ubisoft.com",
  });

  const newGame = new Game({
    title: "Far Cry 142",
    publisher: newPublisher,
  });

  const result = await newGame.save();

  res.status(201).json(result);
});

app.post("/cars", async (req, res) => {
  const car = await Car.create({
    model: "Toyota Camry",
    producer: "Toyota",
  });

  const driver = await Driver.create({
    name: "Johnny Sacrimoni",
    car: car._id,
  });

  res.status(201).json(driver);
});

app.get("/cars/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  const driver = await Driver.findById(driverId);

  const foundCar = await Car.findById(driver.car);

  driver.car = foundCar;

  res.status(200).json(driver);
});

app.post("/passports", async (req, res) => {
  const person = await Person.create({
    name: "Junior Soprano",
    age: 75,
  });

  const passport = await Passport.create({
    number: 506,
    person: person._id,
  });

  const updatedPerson = await Person.findByIdAndUpdate(
    person._id,
    {
      passport: passport._id,
    },
    { new: true }
  );

  res.status(200).json({ updatedPerson, passport });
});

app.post("/posts", async (req, res) => {
  const post = await Post.create({
    title: "Hello",
    text: "My first post",
  });

  const comment1 = await Comment.create({
    title: "First comment",
    text: "Text",
    post: post._id,
  });

  const comment2 = await Comment.create({
    title: "Second comment",
    text: "Text",
    post: post._id,
  });

  const updatedPost = await Post.findByIdAndUpdate(
    post._id,
    {
      $push: { comments: [comment1._id, comment2._id] },
    },
    { new: true }
  );

  res.status(201).json(updatedPost);
});

app.get("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;

  const commentsArray = await Comment.find({ post: postId });

  const post = await Post.findById(postId);

  post.comments = commentsArray;

  res.status(200).json(post);
});

app.post("/films", async (req, res) => {
  const film = await Film.create({
    title: "Star Wars Episode IV: A New Hope",
    year: 1979,
  });

  const film2 = await Film.create({
    title: "Indiana Jones",
    year: 1980,
  });

  const actor1 = await Actor.create({
    name: "Harrison Ford",
    age: 35,
  });

  const actor2 = await Actor.create({
    name: "Kerry Fisher",
    age: 20,
  });

  const updatedFilm = await Film.findByIdAndUpdate(
    film._id,
    {
      $push: { actors: [actor1._id, actor2._id] },
    },
    { new: true }
  );

  const updatedActor1 = await Actor.findByIdAndUpdate(
    actor1._id,
    {
      $push: { films: [film._id, film2._id] },
    },
    { new: true }
  );

  res.status(200).json({ updatedFilm, updatedActor1 });
});

app.listen(5000, () => console.log("Port 5000 is up and running!"));
