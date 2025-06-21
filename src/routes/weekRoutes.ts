import express from "express";
import WeekActivity from "../models/WeekActivity";
import Counters from "../models/CountersModel";
import CountersModel from "../models/CountersModel";

const router = express.Router();


// Ottieni attività di una settimana
router.get("/:weekOffset", async (req, res) => {
  const { weekOffset } = req.params;
  const data = await WeekActivity.findOne({ weekOffset: parseInt(weekOffset) });
  res.json(data?.activities || {});
});

// Salva/aggiorna attività di una settimana
router.post("/:weekOffset", async (req, res) => {
  const { weekOffset } = req.params;
  const { activities } = req.body;

  const updated = await WeekActivity.findOneAndUpdate(
    { weekOffset: parseInt(weekOffset) },
    { activities },
    { upsert: true, new: true }
  );

  res.json(updated);
});

// Ottieni contatori
router.get("/counters/:year", async (req, res) => {
  const { year } = req.params;
  const data = await Counters.findOne({ year: parseInt(year) });
  res.json(data?.counters || {});
});

// Aggiorna contatori
router.post("/counters/:year", async (req, res) => {
  const { year } = req.params;
   const newCounters = req.body;

   try {
    const updated = await CountersModel.findOneAndUpdate(
      { year },
      { $set: { counters: newCounters } },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Errore nel salvataggio dei contatori annuali' });
  }
});

export default router;
