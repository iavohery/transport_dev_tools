const Paiment = require('../Modele/paiement');
const Posseder = require('../Modele/posseder');
const Reserver = require('../Modele/reserver');
const Colis = require('../Modele/colis');

// CREATE
exports.createPaiment = async (req, res) => {
  try {
    const { montant_total, mode_paiment, statut } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Paiment.create({
      montant_total,
      mode_paiment,
      statut
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du paiement." });
  }
};

// UPDATE
// exports.updateTrajet = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { point_depart, destination, heure_depart, tarif } = req.body;

//     const existTrajet = await Trajet.findByPk(id);
//     if (!existTrajet) {
//       return res.status(404).json({ error: "Trajet non trouvé" });
//     }

//     await existTrajet.update({
//       point_depart,
//       destination,
//       heure_depart,
//       tarif
//     });

//     return res.status(200).json({
//       message: "Mise à jour effectuée avec succès",
//       data: existTrajet,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour :", error);
//     return res.status(500).json({ error: "Erreur lors de la mise à jour du trajet." });
//   }
// };

// DELETE
// exports.deleteTrajet = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const trajet = await Trajet.findByPk(id);
//     if (!trajet) {
//       return res.status(404).json({ message: "Trajet introuvable" });
//     }

//     console.log("Trajet à supprimer :", trajet);

//     await trajet.destroy();

//     return res.status(200).json({ message: "Trajet supprimé avec succès" });
//   } catch (error) {
//     console.error("Erreur lors de la suppression :", error);
//     return res.status(500).json({ message: "Erreur lors de la suppression" });
//   }
// };

// GET ALL
exports.getAllPaiment = async (req, res) => {
  try {
    const posseders = await Posseder.findAll({ 
      order: [['id', 'DESC']],
      include: [
        {
          model: Paiment,
          attributes: ['idpaiement', 'montant_total', 'mode_paiement', 'statut']
        },
        {
          model: Reserver,
          attributes: ['id', 'date'],
          include: [
            {
              model: Utilisateur,
              attributes: ['nom']
            }
          ]
        },
        {
          model: Colis,
          attributes: ['idcolis', 'type'],
          include: [
            {
              model: Utilisateur,
              attributes: ['nom']
            }
          ]
        }
      ]
    });

    return res.status(200).json({
      message: "Liste des paiements récupérée avec succès",
      data: posseders,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};


// GET BY ID
// exports.getPaimentById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const paiment = await Paiment.findByPk(id);

//     if (!paiment) {
//       return res.status(404).json({ message: "Paiment introuvable" });
//     }

//     return res.status(200).json({
//       message: "Paiment trouvé avec succès",
//       data: paiment,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
