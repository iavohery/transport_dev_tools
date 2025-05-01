const Place = require('../Modele/place');
const Utilisateur = require('../Modele/utilisateur');
const Reserver = require('../Modele/reserver');

// CREATE
exports.createReservation = async (req, res) => {
  try {
    const { date, idplace, iduser } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Reserver.create({
        date, 
        idplace,
        iduser,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de lareservation." });
  }
};

// UPDATE
// exports.updatePlace = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { numplace, statut, idvoiture } = req.body;

//     const existPlace = await Place.findByPk(id);
//     if (!existPlace) {
//       return res.status(404).json({ error: "Place non trouvée" });
//     }

//     await existPlace.update({
//       numplace,
//       statut,
//       idvoiture,
//     });

//     return res.status(200).json({
//       message: "Mise à jour effectuée avec succès",
//       data: existPlace,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour :", error);
//     return res.status(500).json({ error: "Erreur lors de la mise à jour de la place." });
//   }
// };

// DELETE
// exports.deletePlace = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const place = await Place.findByPk(id);
//     if (!place) {
//       return res.status(404).json({ message: "Place introuvable" });
//     }

//     console.log("Place à supprimer :", place);

//     await place.destroy();

//     return res.status(200).json({ message: "Place supprimée avec succès" });
//   } catch (error) {
//     console.error("Erreur lors de la suppression :", error);
//     return res.status(500).json({ message: "Erreur lors de la suppression" });
//   }
// };

// GET ALL
exports.getAllReservation = async (req, res) => {
  try {
    const reservation = await Reserver.findAll({
      order: [['id', 'DESC']],
      include: [
        {
        model: Place,
        attributes: ['idplace', 'numplace'],
        },
        {
        model: Utilisateur,
        attributes: ['iduser', 'numcin', 'nom', 'numtel'],
        },
    ]
    });

    return res.status(200).json({
      message: "Liste des reservations récupérée avec succès",
      data: reservation,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des reservations" });
  }
};

// GET BY ID
// exports.getReservationById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const reservation = await Reserver.findByPk(id, {
//         include: [
//             {
//             model: Place,
//             attributes: ['idplace', 'numplace'],
//             },
//             {
//             model: Utilisateur,
//             attributes: ['iduser', 'numcin', 'nom', 'numtel'],
//             },
//         ]
//     });

//     if (!reservation) {
//       return res.status(404).json({ message: "Reservation introuvable" });
//     }

//     return res.status(200).json({
//       message: "Reservation trouvée avec succès",
//       data: reservation,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
