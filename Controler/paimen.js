const Posseder = require("../Modele/posseder");
const Reserver = require("../Modele/reserver");
const Colis = require("../Modele/colis");
const Paiement = require("../Modele/paiement");
const Utilisateur = require("../Modele/utilisateur");

// CREATE
exports.createPaiment = async (req, res) => {
  try {
    const { montant_total, mode_paiment, statut, date } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Paiement.create({
      montant_total,
      mode_paiment,
      statut,
      date,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du paiement." });
  }
};

//UPDATE
exports.updatePaiement = async (req, res) => {
  try {
    const { id } = req.params;
    const { montant_total, mode_paiment, statut, date } = req.body;
    const paiement = await Paiement.findByPk(id);
    if (!paiement) {
      return res.status(404).json({ error: "Paiement non trouvé" });
    }

    await paiement.update({
      montant_total,
      mode_paiment,
      statut,
      date,
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: paiement,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du trajet." });
  }
};

//DELETE
exports.deletePaiement = async (req, res) => {
  try {
    const { id } = req.params;

    const paiement = await Paiement.findByPk(id);
    if (!paiement) {
      return res.status(404).json({ message: "Paiement introuvable" });
    }

    await paiement.destroy();

    return res.status(200).json({ message: "Paiement supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

exports.getAllPaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findAll({
      order: [["idpaiement", "DESC"]],
    });

    return res.status(200).json({
      message: "Liste des paiement récupérée avec succès",
      data: paiement,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des paiements" });
  }
};

// GET ALL
exports.getAllPaimentPosseder = async (req, res) => {
  try {
    const posseders = await Posseder.findAll({
      order: [["id", "DESC"]],
      include: [
        {
          model: Paiement,
          attributes: ["idpaiement", "montant_total", "mode_paiment", "statut"],
        },
        {
          model: Reserver,
          attributes: ["id", "date"],
          include: [
            {
              model: Utilisateur,
              attributes: ["nom"],
            },
          ],
        },
        {
          model: Colis,
          attributes: ["idcolis", "type"],
        },
      ],
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
