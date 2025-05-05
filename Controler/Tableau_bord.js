const { Op, fn, col } = require('sequelize');
const Paiement = require('../Modele/paiement');
const Depense = require('../Modele/depense');
const Voyage= require('../Modele/voyage');

// Depenses hebdomadaire totales
exports.DepensesParJour = async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // 1. Dépenses groupées par jour
    const depensesParJour = await Depense.findAll({
      attributes: [
        [fn('DATE', col('date')), 'jour'],
        [fn('SUM', col('montant')), 'total']
      ],
      where: {
        date: {
          [Op.between]: [startOfWeek, endOfWeek]
        }
      },
      group: [fn('DATE', col('date'))],
      order: [[fn('DATE', col('date')), 'ASC']]
    });

    // 2. Générer la liste complète des jours de la semaine (dimanche à samedi)
    const joursSemaine = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateStr = d.toISOString().slice(0, 10); // Format 'YYYY-MM-DD'
      joursSemaine[dateStr] = 0; // Initialiser avec 0
    }

    // 3. Injecter les totaux des dépenses récupérées de la base
    depensesParJour.forEach(depense => {
      const jour = depense.dataValues.jour;
      const total = parseFloat(depense.dataValues.total);
      joursSemaine[jour] = total;
    });

    // 4. Convertir l'objet joursSemaine en tableau pour renvoyer la réponse
    const resultatsComplets = Object.entries(joursSemaine).map(([jour, total]) => ({
      jour,
      total
    }));

    // 5. Calculer la somme totale des dépenses de la semaine
    const totalHebdomadaireResult = await Depense.findOne({
      attributes: [[fn('SUM', col('montant')), 'totalHebdomadaire']],
      where: {
        date: {
          [Op.between]: [startOfWeek, endOfWeek]
        }
      }
    });

    const totalHebdomadaire = totalHebdomadaireResult.dataValues.totalHebdomadaire || 0;

    return res.status(200).json({
      message: "Dépenses hebdomadaires groupées par jour",
      depensesParJour: resultatsComplets,
      totalHebdomadaire
    });
  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return res.status(500).json({ message: "Erreur lors du calcul des dépenses hebdomadaires" });
  }
};

// chiffre d' affaire par semaine
exports.PaiementsParJour = async (req, res) => {
    try {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // dimanche
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // samedi
  
      // 1. Paiements groupés par jour de la semaine
      const paiementsParJour = await Paiement.findAll({
        attributes: [
          [fn('DATE', col('date')), 'jour'],
          [fn('SUM', col('montant_total')), 'total']
        ],
        where: {
          date: {
            [Op.between]: [startOfWeek, endOfWeek]
          }
        },
        group: [fn('DATE', col('date'))],
        order: [[fn('DATE', col('date')), 'ASC']]
      });
  
      // 2. Générer tous les jours de la semaine avec total = 0
      const joursSemaine = {};
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const dateStr = d.toISOString().slice(0, 10); // Format 'YYYY-MM-DD'
        joursSemaine[dateStr] = 0;
      }
  
      // 3. Injecter les totaux récupérés de la base
      paiementsParJour.forEach(paiement => {
        const jour = paiement.dataValues.jour;
        const total = parseFloat(paiement.dataValues.total);
        joursSemaine[jour] = total;
      });
  
      // 4. Convertir l'objet en tableau
      const resultatsComplets = Object.entries(joursSemaine).map(([jour, total]) => ({
        jour,
        total
      }));
  
      // 5. Total des paiements de la semaine
      const totalHebdomadaireResult = await Paiement.findOne({
        attributes: [[fn('SUM', col('montant_total')), 'totalHebdomadaire']],
        where: {
          date: {
            [Op.between]: [startOfWeek, endOfWeek]
          }
        }
      });
  
      const totalHebdomadaire = totalHebdomadaireResult.dataValues.totalHebdomadaire || 0;
  
      return res.status(200).json({
        message: "Paiements hebdomadaires groupés par jour",
        paiementsParJour: resultatsComplets,
        totalHebdomadaire
      });
  
    } catch (error) {
      console.error("Erreur lors du calcul des paiements :", error);
      return res.status(500).json({ message: "Erreur lors du calcul des paiements par jour" });
    }
  };

  // trajet effectuer par semaine
  exports.VoyagesParJour = async (req, res) => {
    try {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // dimanche
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // samedi
  
      // 1. Nombre de voyages groupés par jour
      const voyagesParJour = await Voyage.findAll({
        attributes: [
          [fn('DATE', col('date')), 'jour'],
          [fn('COUNT', col('date')), 'total']
        ],
        where: {
          date: {
            [Op.between]: [startOfWeek, endOfWeek]
          },
          statut: "effectuer"
        },
        group: [fn('DATE', col('date'))],
        order: [[fn('DATE', col('date')), 'ASC']]
      });
  
      // 2. Préparer tous les jours de la semaine (0 par défaut)
      const joursSemaine = {};
      for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        const dateStr = d.toISOString().slice(0, 10); // format 'YYYY-MM-DD'
        joursSemaine[dateStr] = 0;
      }
  
      // 3. Remplir les jours avec les valeurs réelles
      voyagesParJour.forEach(voyage => {
        const jour = voyage.dataValues.jour;
        const total = parseInt(voyage.dataValues.total);
        joursSemaine[jour] = total;
      });
  
      // 4. Reformater en tableau pour le frontend
      const resultatsComplets = Object.entries(joursSemaine).map(([jour, total]) => ({
        jour,
        total
      }));
  
      // 5. Total des voyages de la semaine
      const totalHebdomadaire = resultatsComplets.reduce((acc, val) => acc + val.total, 0);
  
      return res.status(200).json({
        message: "Voyages hebdomadaires groupés par jour",
        voyagesParJour: resultatsComplets,
        totalHebdomadaire
      });
  
    } catch (error) {
      console.error("Erreur lors du calcul des voyages :", error);
      return res.status(500).json({ message: "Erreur lors du calcul des voyages par jour" });
    }
  };