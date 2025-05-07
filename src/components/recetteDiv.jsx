import { forwardRef,useEffect, useState } from "react";
import "../css/recetteDiv.css";
import Tableau_recette from "./tableau_recette";
import {
  PaiementsParJour,
  DepensesParJour,
  VoyagesParJour
} from "../assets/servicRoute/dashboard";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

  const RecetteDiv = forwardRef((props, ref) => {
    const [dataSections, setDataSections] = useState({
      chiffreAffaire: [],
      depenses: [],
      benefice: [],
      trajet: [],
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const paiementsResponse = await PaiementsParJour();
          const depensesResponse = await DepensesParJour();
          const voyagesResponse = await VoyagesParJour();
  
          console.log("Paiements:", paiementsResponse.data);
          console.log("Dépenses:", depensesResponse.data);
          console.log("Voyages:", voyagesResponse.data);
  
          setDataSections({
            chiffreAffaire: paiementsResponse.data.paiementsParJour,
            depenses: depensesResponse.data.depensesParJour,
            benefice: paiementsResponse.data.paiementsParJour.map((p, i) => ({
              jour: p.jour,
              total:
                p.total -
                (depensesResponse.data.depensesParJour[i]?.total || 0),
            })),
            trajet: voyagesResponse.data.voyagesParJour,
          });
        } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
        }
      };
  
      fetchData();
    }, []);

  const getChartConfig = (sectionData, title, color) => ({
    data: {
      labels: sectionData.map((item) => item.jour),
      datasets: [
        {
          label: title,
          data: sectionData.map((item) => item.total),
          borderColor: color,
          backgroundColor: color.replace("1)", "0.2)"),
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: title },
      },
      scales: {
        y: {
          beginAtZero: false,
          // title: { display: true, text: "Montant (Ar)" },
        },
        x: {
          title: { display: true, text: "Date" },
        },
      },
    },
  });

  const sections = [
    {
      id: "chiffre-affaire",
      className: "chiffre section",
      title: "Chiffre d'affaires",
      color: "rgba(75, 192, 192, 1)",
      dataKey: "chiffreAffaire",
    },
    {
      id: "depenses",
      className: "depense section",
      title: "Dépenses",
      color: "rgba(75, 192, 192, 1)",
      dataKey: "depenses",
    },
    {
      id: "benefice",
      className: "benefice section",
      title: "Bénéfices",
      color: "rgba(75, 192, 192, 1)",
      dataKey: "benefice",
    },
    {
      id: "trajet",
      className: "trajet1 section",
      title: "Trajets",
      color: "rgba(75, 192, 192, 1)",
      dataKey: "trajet",
    },
  ];
 
  return (
    <div className="recetteDiv" ref={ref}>
      {sections.map((section) => {
        const config = getChartConfig(
          dataSections[section.dataKey],
          section.title,
          section.color
        );

        return (
          <div key={section.id} id={section.id} className={section.className}>
            <Tableau_recette
              data={dataSections[section.dataKey]}
              title={`Tableau des ${section.title.toLowerCase()}`}
            />
            <div className="graphe">
              <h2>Statistique des {section.title.toLowerCase()}</h2>
              <Line
                id={`chart-${section.id}`}
                data={config.data}
                options={config.options}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default RecetteDiv;
