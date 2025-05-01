const Depense = require('../Modele/depense');
const Voiture = require('../Modele/voiture');

// CREATE
exports.createDepense = async (req, res) => {
  try {
    const { type, montant, date } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Depense.create({
      type,
      montant,
      date,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de la depense." });
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
exports.getAllDepense = async (req, res) => {
  try {
    const depenses = await Depense.findAll({
      order: [['iddepense', 'DESC']],
      include: {
        model: Voiture,
        attributes: ['idvoiture', 'numero_matricule', 'marque'],
      },
    });

    return res.status(200).json({
      message: "Liste des depenses récupérée avec succès",
      data: depenses,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des depenses" });
  }
};

// GET BY ID
// exports.getDepenseById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const depense = await Depense.findByPk(id, {
//       include: {
//         model: Voiture,
//         attributes: ['idvoiture', 'numero_matricule', 'marque'],
//       },
//     });

//     if (!depense) {
//       return res.status(404).json({ message: "Depense introuvable" });
//     }

//     return res.status(200).json({
//       message: "Depense trouvée avec succès",
//       data: depense,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
