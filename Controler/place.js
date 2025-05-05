const Place = require('../Modele/place');
const Voiture = require('../Modele/voiture');
const Voyage = require('../Modele/voyage');
const Trajet = require('../Modele/trajet');
const Reserver = require('../Modele/reserver');

// CREATE
exports.createPlace = async (req, res) => {
  try {
    const { numplace, statut, idvoiture } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Place.create({
      numplace,
      statut,
      idvoiture,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de la place." });
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
      statut,
      idvoiture,
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: existPlace,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour de la place." });
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
      order: [['idplace', 'DESC']],
      include: {
        model: Voiture,
        attributes: ['idvoiture', 'numero_matricule', 'marque'],
      },
    });

    return res.status(200).json({
      message: "Liste des places récupérée avec succès",
      data: places,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des places" });
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
exports.getVoituresAvecPlacesOccupees = async (req, res) => {
  try {
    const { point_depart, destination, date } = req.body;

    const voitures = await Voiture.findAll({
      include: [
        {
          model: Voyage,
          required: true,
          where: { date: date },
          include: [
            {
              model: Trajet,
              required: true,
              where: {
                point_depart: point_depart,
                destination: destination
              }
            }
          ]
        },
        {
          model: Place,
          required: true,
          include: [
            {
              model: Reserver,
              required: true, // ✅ Place doit être réservée
              where: {
                date: date
              }
            }
          ]
        }
      ]
    });

    return res.status(200).json({
      message: "Voitures avec places occupées récupérées avec succès",
      data: voitures
    });

  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
