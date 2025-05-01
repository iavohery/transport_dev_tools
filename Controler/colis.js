const Colis = require('../Modele/colis');
const Utilisateur = require('../Modele/utilisateur');
const Poids = require('../Modele/poids');

// CREATE
exports.createColis = async (req, res) => {
  try {
    const { type, iduser, idpoids, dateEnvoi } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Colis.create({
      type,
      iduser,
      idpoids,
      dateEnvoi
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création de la colis." });
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
exports.getAllColis = async (req, res) => {
  try {
    const colis = await Colis.findAll({
      order: [['idcolis', 'DESC']],
      include: [ 
        {
          model: Utilisateur,
          attributes: ['iduser', 'numcin', 'nom', 'numtel'],
        },
        {
          model: Poids,
          attributes: ['idpoids', 'min', 'max', 'prix'],
        },
      ]
    });

    return res.status(200).json({
      message: "Liste des colis récupérée avec succès",
      data: places,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération des places" });
  }
};

// GET BY ID
// exports.getColisById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const colis = await Colis.findByPk(id, {
//       include:[ 
//       {
//         model: Utilisateur,
//         attributes: ['iduser', 'numcin', 'nom', 'numtel'],
//       },
//       {
//         model: Poids,
//         attributes: ['idpoids', 'min', 'max', 'prix'],
//       },
//     ]
//     });

//     if (!colis) {
//       return res.status(404).json({ message: "Colis introuvable" });
//     }

//     return res.status(200).json({
//       message: "colis trouvée avec succès",
//       data: colis,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
