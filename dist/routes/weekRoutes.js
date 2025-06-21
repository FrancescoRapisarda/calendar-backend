"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WeekActivity_1 = __importDefault(require("../models/WeekActivity"));
const CountersModel_1 = __importDefault(require("../models/CountersModel"));
const CountersModel_2 = __importDefault(require("../models/CountersModel"));
const router = express_1.default.Router();
// Ottieni attività di una settimana
router.get("/:weekOffset", async (req, res) => {
    const { weekOffset } = req.params;
    const data = await WeekActivity_1.default.findOne({ weekOffset: parseInt(weekOffset) });
    res.json(data?.activities || {});
});
// Salva/aggiorna attività di una settimana
router.post("/:weekOffset", async (req, res) => {
    const { weekOffset } = req.params;
    const { activities } = req.body;
    const updated = await WeekActivity_1.default.findOneAndUpdate({ weekOffset: parseInt(weekOffset) }, { activities }, { upsert: true, new: true });
    res.json(updated);
});
// Ottieni contatori
router.get("/counters/:year", async (req, res) => {
    const { year } = req.params;
    const data = await CountersModel_1.default.findOne({ year: parseInt(year) });
    res.json(data?.counters || {});
});
// Aggiorna contatori
router.post("/counters/:year", async (req, res) => {
    const { year } = req.params;
    const newCounters = req.body;
    try {
        const updated = await CountersModel_2.default.findOneAndUpdate({ year }, { $set: { counters: newCounters } }, { upsert: true, new: true });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: 'Errore nel salvataggio dei contatori annuali' });
    }
});
exports.default = router;
