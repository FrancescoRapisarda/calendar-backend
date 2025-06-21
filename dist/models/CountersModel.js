"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Counters.ts
const mongoose_1 = __importDefault(require("mongoose"));
const CountersSchema = new mongoose_1.default.Schema({
    year: Number,
    counters: Object
});
exports.default = mongoose_1.default.model("Counters", CountersSchema);
