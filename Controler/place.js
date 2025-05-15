const Place = require("../Modele/place");
const Voiture = require("../Modele/voiture");
const Voyage = require("../Modele/voyage");
const Trajet = require("../Modele/trajet");
const Reserver = require("../Modele/reserver");
const { Sequelize } = require("sequelize");

// CREATE
exports.createPlace = async ({ numplace, idvoiture }) => {
  try {
    console.log("Données reçues :", { numplace, idvoiture });

    const create = await Place.create({
      numplace,
      idvoiture,
    });

    console.log("création de la place avecsucce:", create);
  } catch (error) {
    console.error("Erreur lors de la création de la place :", error);
    throw err;
  }
};

// UPDATE
exports.updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const { numplace, statut, idvoiture } = req.body;

    const existPlace = await Place.findByPk(id);
    if (!existPlace) {
      return res.status(404).json({ error: "Place non trouvée" });
    }

    await existPlace.update({
      numplace,
      idvoiture,
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: existPlace,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la place." });
  }
};

// DELETE
exports.deletePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const place = await Place.findByPk(id);
    if (!place) {
      return res.status(404).json({ message: "Place introuvable" });
    }

    console.log("Place à supprimer :", place);

    await place.destroy();

    return res.status(200).json({ message: "Place supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllPlace = async (req, res) => {
  try {
    const places = await Place.findAll({
      order: [["idplace", "DESC"]],
      include: {
        model: Voiture,
        attributes: ["idvoiture", "numero_matricule", "marque"],
      },
    });

    return res.status(200).json({
      message: "Liste des places récupérée avec succès",
      data: places,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des places" });
  }
};

// GET BY ID
// exports.getPlaceById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const place = await Place.findByPk(id, {
//       include: {
//         model: Voiture,
//         attributes: ['idvoiture', 'numero_matricule', 'marque'],
//       },
//     });

//     if (!place) {
//       return res.status(404).json({ message: "Place introuvable" });
//     }

//     return res.status(200).json({
//       message: "Place trouvée avec succès",
//       data: place,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };

// Voiture avec Place Occupes
const { Op } = require("sequelize");

exports.getVoituresAvecPlacesOccupees = async (req, res) => {
  try {
    const { point_depart, destination } = req.body;

    // Obtenir la date et heure actuelles
    const now = new Date();

    // Récupérer tous les voyages à venir
    const voyages = await Voyage.findAll({
      where: {
        [Op.and]: [
          // Crée une condition pour exclure les dates/heure passées
          Sequelize.where(
            Sequelize.fn(
              "STR_TO_DATE",
              Sequelize.fn(
                "CONCAT",
                Sequelize.col("date"),
                " ",
                Sequelize.col("heure_depart")
              ),
              "%Y-%m-%d %H:%i:%s"
            ),
            {
              [Op.gte]: now,
            }
          ),
        ],
      },
      include: [
        {
          model: Trajet,
          required: true,
          where: { point_depart, destination },
        },
      ],
    });

    if (!voyages || voyages.length === 0) {
      return res.status(404).json({ message: "Aucun voyage à venir trouvé." });
    }

    const voyageIds = voyages.map((v) => v.idvoyage);

    const voitures = await Voiture.findAll({
      include: [
        {
          model: Voyage,
          required: true,
          where: {
            idvoyage: voyageIds,
          },
          include: [
            {
              model: Trajet,
              required: true,
              where: { point_depart, destination },
            },
          ],
        },
        {
          model: Place,
          include: [
            {
              model: Reserver,
              required: false,
              where: { idvoyage: voyageIds },
            },
          ],
        },
      ],
    });

    return res.status(200).json({
      message: "Voitures avec places occupées récupérées avec succès",
      data: voitures,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
