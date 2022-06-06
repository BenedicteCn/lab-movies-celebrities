// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Movie = require("../models/Movie.model");

router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.status(200).json(allMovies);
  } catch (err) {
    // having the error as the argument of next allows us to get into the second middleware
    // from error-handling.js if there is a database error (we don't want a 404 in this case)
    next(err);
  }
});

router.post("/movies/create", async (req, res) => {
  try {
    const createOneMovie = await Movie.create(req.body);
  } catch (e) {
    console.error(e);
  }
  const movie = req.body;
  if (!movie.title) {
    res.status(400).json({
      message: "Movie title not provided",
    });
    return;
  }
  res.status(201).json({
    message: `${movie.title} has been CREATED`,
  });
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const oneMovie = await Movie.findById(movieId);
    res.status(200).json(oneMovie);
  } catch (err) {
    // having the error as the argument of next allows us to get into the second middleware
    // from error-handling.js if there is a database error (we don't want a 404 in this case)
    next(err);
  }
});

router.delete("/movies/:id", async (req, res, next) => {
  try {
    const deletedThing = await Movie.findByIdAndDelete(req.params.id);
    console.log(deletedThing);
    res.json({ message: `I deleted ${deletedThing.title}` });
  } catch (err) {
    next(err);
  }
});

router.post("/movies/:id", async (req, res, next) => {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("name");

    res.status(200).json(updateMovie);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
