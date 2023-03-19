const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const emailSchema = mongoose.Schema(
  {
    emailId: { type: String, unique: true, required: true },
    pathFile: { type: String },
  },
  {
    timestamps: true,
  }
);

const Email = mongoose.model("emails", emailSchema);
module.exports = Email;
