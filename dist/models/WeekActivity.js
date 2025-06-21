"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/WeekActivity.ts
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model("WeekActivity", activitySchema);
