const Voiture = require("../Modele/voiture");
const Voyage = require("../Modele/voyage");
const Trajet = require("../Modele/trajet");

// CREATE
exports.createVoiture = async (req, res) => {
  try {
    const { numero_matricule, numero, marque, capacite } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Voiture.create({
      numero_matricule,
      numero,
      marque,
      capacite,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la voiture." });
  }
};

// UPDATE
exports.updateVoiture = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_matricule, numero, marque, capacite } = req.body;

    const existVoiture = await Voiture.findByPk(id);
    if (!existVoiture) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    await existVoiture.update({
      numero_matricule,
      numero,
      marque,
      capacite,
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: existVoiture,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la voiture." });
  }
};

// DELETE
exports.deleteVoiture = async (req, res) => {
  try {
    const { id } = req.params;

    const voiture = await Voiture.findByPk(id);
    if (!voiture) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    console.log("Voiture à supprimer :", voiture);

    await voiture.destroy();

    return res.status(200).json({ message: "Voiture supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllVoiture = async (req, res) => {
  try {
    const voitures = await Voiture.findAll({
      order: [["idvoiture", "DESC"]],
      attributes: [
        "idvoiture",
        "numero_matricule",
        "numero",
        "marque",
        "capacite",
      ],
      include: [
        {
          model: Voyage,
          include: [
            {
              model: Trajet,
              attributes: ["idtrajet", "point_depart", "destination", "tarif"],
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      message: "Liste des voitures avec leurs trajets récupérée avec succès",
      data: voitures,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// GET BY ID
// exports.getVoitureById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const voiture = await Voiture.findByPk(id, {
//     });

//     if (!voiture) {
//       return res.status(404).json({ message: "Voiture introuvable" });
//     }

//     return res.status(200).json({
//       message: "Voiture trouvée avec succès",
//       data: voiture,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
