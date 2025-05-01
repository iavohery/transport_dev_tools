const Posseder = require('../Modele/posseder');

// CREATE
exports.createPosseder = async (req, res) => {
  try {
    const { id, idpaiement, idcolis } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Posseder.create({
        id,
        idpaiement,
        idcolis
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de la possession." });
  }
};