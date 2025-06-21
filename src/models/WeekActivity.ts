// models/WeekActivity.ts
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  weekOffset: Number,
  activities: {
    type: Map,
    of: {
      classe: String,
      risorse: String,
      spazio: String
    }
  }
});

export default mongoose.model("WeekActivity", activitySchema);
