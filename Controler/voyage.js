const { Trajet, Voiture, Employe, Poste } = require("../Modele");
const Voyage = require("../Modele/voyage");

// CREATE
exports.createVoyage = async (req, res) => {
  try {
    const { date, heure_depart, statut, idvoiture, idtrajet, idemploye } =
      req.body;
    console.log("Données reçues :", req.body);

    const create = await Voyage.create({
      date,
      heure_depart,
      idvoiture,
      idtrajet,
      idemploye,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du voyage." });
  }
};

exports.updateVoyage = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, heure_depart, statut, idvoiture, idtrajet, idemploye } =
      req.body;

    const employe = await Employe.findByPk(idemploye);
    if (!employe) {
      return res.status(404).json({ error: "Employé non trouvé" });
    }

    const trajet = await Trajet.findByPk(idtrajet);
    if (!trajet) {
      return res.status(404).json({ error: "Trajet non trouvé" });
    }

    const voiture = await Voiture.findByPk(idvoiture);
    if (!voiture) {
      return res.status(404).json({ error: "Voiture non trouvée" });
    }

    const voyage = await Voyage.findByPk(id);
    if (!voyage) {
      return res.status(404).json({ error: "Voyage non trouvé" });
    }

    await voyage.update({
      date,
      heure_depart,
      statut,
      idvoiture,
      idtrajet,
      idemploye,
    });

    return res.status(200).json({
      message: "Voyage mis à jour avec succès",
      data: voyage,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du voyage." });
  }
};

// DELETE
exports.deleteVoyage = async (req, res) => {
  try {
    const { id } = req.params;

    const voyage = await Voyage.findByPk(id);
    if (!voyage) {
      return res.status(404).json({ message: "Voyage introuvable" });
    }

    await voyage.destroy();

    return res.status(200).json({ message: "Voyage supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllVoyage = async (req, res) => {
  try {
    const voyage = await Voyage.findAll({
      order: [["idvoyage", "DESC"]],
      include: {
        model: Employe,
        include: [
          {
            model: Poste,
            attributes: ["idposte", "nom_poste"],
          },
        ],
      },
    });

    return res.status(200).json({
      message: "Liste des utilisateurs récupérée avec succès",
      data: voyage,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
};
