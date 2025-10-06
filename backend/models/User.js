const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" }
}, { timestamps: true });
// timestamp ne vax yaradlib ne vax update elediyimizi belirtmek ucundu

module.exports = mongoose.model("User", userSchema);
