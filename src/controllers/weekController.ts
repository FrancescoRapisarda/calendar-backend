// controllers/weekController.ts
import { Request, Response } from "express";
import WeekActivity from "../models/WeekActivity";

// ✅ GET - Ottieni una settimana
export const getWeek = async (req: Request, res: Response) => {
  const { weekOffset } = req.params;
  
  try {
    const week = await WeekActivity.findOne({ weekOffset: Number(weekOffset) });
    if (!week) return res.status(404).json({ message: "Settimana non trovata" });
    
    res.json(week.activities || {});
  } catch (err) {
    console.error("Errore nel recupero dati:", err);
    res.status(500).json({ error: "Errore nel recupero dati" });
  }
};


// ✅ POST - Salva o aggiorna una settimana
export const saveWeek = async (req: Request, res: Response) => {
  const { weekOffset } = req.params;
  const { activities } = req.body;
  
  if (!activities || typeof activities !== "object" || Array.isArray(activities)) {
    return res.status(400).json({ error: "Formato attività non valido" });
  }
  
  try {
    const updatedWeek = await WeekActivity.findOneAndUpdate(
      { weekOffset: Number(weekOffset) },
      { $set: { activities } },
      { new: true, upsert: true } // crea se non esiste
    );
    res.status(201).json(updatedWeek);
  } catch (err) {
    res.status(500).json({ error: "Errore nel salvataggio" });
  }
};
