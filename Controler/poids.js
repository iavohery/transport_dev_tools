const Poids = require('../Modele/poids');

// CREATE
exports.createPoids = async (req, res) => {
  try {
    const { min, max, prix } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Poids.create({
      min,
      max,
      prix
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du poids." });
  }
};

// UPDATE
exports.updatePoids = async (req, res) => {
  try {
    const { id } = req.params;
    const { min, max, prix } = req.body;

    const existPoids = await Poids.findByPk(id);
    if (!existPoids) {
      return res.status(404).json({ error: "Poids non trouvé" });
    }

    await existPoids.update({
      min,
      max,
      prix
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: existPoids,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour du poids." });
  }
};

// DELETE
exports.deletePoids = async (req, res) => {
  try {
    const { id } = req.params;

    const poids = await Poids.findByPk(id);
    if (!poids) {
      return res.status(404).json({ message: "Poids introuvable" });
    }

    console.log("Poids à supprimer :", poids);

    await poids.destroy();

    return res.status(200).json({ message: "Poids supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllPoids = async (req, res) => {
  try {
    const poids = await Poids.findAll({ order: [['idpoids', 'DESC']] });

    return res.status(200).json({
      message: "Liste des poids récupérée avec succès",
      data: poids,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// GET BY ID
// exports.getPoidsById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const poids = await Poids.findByPk(id);

//     if (!poids) {
//       return res.status(404).json({ message: "Poids introuvable" });
//     }

//     return res.status(200).json({
//       message: "Poids trouvé avec succès",
//       data: poids,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
