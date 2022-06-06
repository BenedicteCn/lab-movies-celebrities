//  Add your code here

const { Schema, SchemaTypes, model } = require("mongoose");

const celebritySchema = new Schema({
  name: SchemaTypes.String,
  occupation: SchemaTypes.String,
  catchPhrase: SchemaTypes.String,
});

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
