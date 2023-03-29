const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const modelSchema = Schema(
  {
    modelId: { type: String, unique: true, required: true },
    pathFile: { type: String },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("models", modelSchema);
module.exports = Model;
