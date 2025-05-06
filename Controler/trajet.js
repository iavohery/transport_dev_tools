const Trajet = require("../Modele/trajet");

// CREATE
exports.createTrajet = async (req, res) => {
  try {
    const { point_depart, destination, tarif } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Trajet.create({
      point_depart,
      destination,
      tarif,
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du trajet." });
  }
};

// UPDATE
exports.updateTrajet = async (req, res) => {
  try {
    const { id } = req.params;
    const { point_depart, destination, tarif } = req.body;

    const existTrajet = await Trajet.findByPk(id);
    if (!existTrajet) {
      return res.status(404).json({ error: "Trajet non trouvé" });
    }

    await existTrajet.update({
      point_depart,
      destination,
      tarif,
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: existTrajet,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du trajet." });
  }
};

// DELETE
exports.deleteTrajet = async (req, res) => {
  try {
    const { id } = req.params;

    const trajet = await Trajet.findByPk(id);
    if (!trajet) {
      return res.status(404).json({ message: "Trajet introuvable" });
    }

    console.log("Trajet à supprimer :", trajet);

    await trajet.destroy();

    return res.status(200).json({ message: "Trajet supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllTrajet = async (req, res) => {
  try {
    const trajets = await Trajet.findAll({ order: [["idtrajet", "DESC"]] });

    return res.status(200).json({
      message: "Liste des trajets récupérée avec succès",
      data: trajets,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// GET BY ID
// exports.getTrajetById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const trajet = await Trajet.findByPk(id);

//     if (!trajet) {
//       return res.status(404).json({ message: "Trajet introuvable" });
//     }

//     return res.status(200).json({
//       message: "Trajet trouvé avec succès",
//       data: trajet,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
