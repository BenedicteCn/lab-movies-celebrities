const { Schema, SchemaTypes, model } = require("mongoose");

const movieSchema = new Schema({
  title: SchemaTypes.String,
  genre: SchemaTypes.String,
  plot: SchemaTypes.String,
  cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
  //cast - Array of object IDs referencing the Celebrity model (basically, the array of celebrities' IDs)
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
