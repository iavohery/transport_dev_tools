const Poste = require('../Modele/poste');

// CREATE
exports.createPoste = async (req, res) => {
  try {
    const { nom_poste } = req.body;
    console.log("Données reçues :", req.body);

    const create = await Poste.create({
      nom_poste
    });

    res.status(201).json(create);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(500).json({ error: "Erreur lors de la création du poste." });
  }
};

// UPDATE
exports.updatePoste = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom_poste } = req.body;

    const existPoste = await Poste.findByPk(id);
    if (!existPoste) {
      return res.status(404).json({ error: "Poste non trouvé" });
    }

    await existPoste.update({
      nom_poste
    });

    return res.status(200).json({
      message: "Mise à jour effectuée avec succès",
      data: existPoste,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    return res.status(500).json({ error: "Erreur lors de la mise à jour du poste." });
  }
};

// DELETE
exports.deletePoste = async (req, res) => {
  try {
    const { id } = req.params;

    const poste = await Poste.findByPk(id);
    if (!poste) {
      return res.status(404).json({ message: "Poste introuvable" });
    }

    console.log("Poste à supprimer :", poste);

    await poste.destroy();

    return res.status(200).json({ message: "Poste supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};

// GET ALL
exports.getAllPoste = async (req, res) => {
  try {
    const postes = await Poste.findAll({ order: [['idposte', 'DESC']] });

    return res.status(200).json({
      message: "Liste des postes récupérée avec succès",
      data: postes,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// GET BY ID
// exports.getPosteById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const poste = await Poste.findByPk(id);

//     if (!poste) {
//       return res.status(404).json({ message: "Poste introuvable" });
//     }

//     return res.status(200).json({
//       message: "Poste trouvé avec succès",
//       data: poste,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la recherche :", error);
//     return res.status(500).json({ message: "Erreur lors de la recherche" });
//   }
// };
