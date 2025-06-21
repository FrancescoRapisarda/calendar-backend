// models/Counters.ts
import mongoose from "mongoose";

const CountersSchema = new mongoose.Schema({
  year: Number,
  counters: Object
});

export default mongoose.model("Counters", CountersSchema);
