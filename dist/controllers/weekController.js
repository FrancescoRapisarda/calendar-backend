"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveWeek = exports.getWeek = void 0;
const WeekActivity_1 = __importDefault(require("../models/WeekActivity"));
// ✅ GET - Ottieni una settimana
const getWeek = async (req, res) => {
    const { weekOffset } = req.params;
    try {
        const week = await WeekActivity_1.default.findOne({ weekOffset: Number(weekOffset) });
        if (!week)
            return res.status(404).json({ message: "Settimana non trovata" });
        res.json(week.activities || {});
    }
    catch (err) {
        console.error("Errore nel recupero dati:", err);
        res.status(500).json({ error: "Errore nel recupero dati" });
    }
};
exports.getWeek = getWeek;
// ✅ POST - Salva o aggiorna una settimana
const saveWeek = async (req, res) => {
    const { weekOffset } = req.params;
    const { activities } = req.body;
    if (!activities || typeof activities !== "object" || Array.isArray(activities)) {
        return res.status(400).json({ error: "Formato attività non valido" });
    }
    try {
        const updatedWeek = await WeekActivity_1.default.findOneAndUpdate({ weekOffset: Number(weekOffset) }, { $set: { activities } }, { new: true, upsert: true } // crea se non esiste
        );
        res.status(201).json(updatedWeek);
    }
    catch (err) {
        res.status(500).json({ error: "Errore nel salvataggio" });
    }
};
exports.saveWeek = saveWeek;
