// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.status(200).json(allCelebrities);
  } catch (err) {
    // having the error as the argument of next allows us to get into the second middleware
    // from error-handling.js if there is a database error (we don't want a 404 in this case)
    next(err);
  }
});

router.post("/celebrities/create", async (req, res) => {
  try {
    const createOneCeleb = await Celebrity.create(req.body);
  } catch (e) {
    console.error(e);
  }
  const celebrity = req.body;
  if (!celebrity.name) {
    res.status(400).json({
      message: "Celebrity name not provided",
    });
    return;
  }
  res.status(201).json({
    message: `${celebrity.name} has been CREATED`,
  });
});

router.post("/celebrities/:id", async (req, res, next) => {
  try {
    const updateCeleb = await Celebrity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateCeleb);
  } catch (err) {
    next(err);
  }
});

router.delete("/celebrities/:id", async (req, res, next) => {
  try {
    const deletedThing = await Celebrity.findByIdAndDelete(req.params.id);
    console.log(deletedThing);
    res.json({ message: `I deleted ${deletedThing.name}` });
  } catch (err) {
    next(err);
  }
});

router.post("/celebrities/:id", async (req, res, next) => {
  try {
    const updateCelebrity = await Celebrity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateCelebrity);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
