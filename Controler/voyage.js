const Voyage = require('../Modele/voyage');

// CREATE
exports.createVoyage = async (req, res) => {
  try {
    const { idvoiture, idtrajet } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Voyage.create({
        idvoiture,
        idtrajet
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du voyage." });
  }
};