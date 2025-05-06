import { forwardRef, useState } from "react";
import "../css/recetteDiv.css";
import Tableau_recette from "./tableau_recette";
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
  // Données pour chaque section
  const [dataSections, setDataSections] = useState({
    chiffreAffaire: [
      { date: "01/01/2023", valeur: 1500 },
      { date: "02/01/2023", valeur: 2100 },
      { date: "03/01/2023", valeur: 1800 },
       { date: "01/01/2023", valeur: 1500 },
      { date: "02/01/2023", valeur: 2100 },
      { date: "03/01/2023", valeur: 1800 },
    ],
    depenses: [
      { date: "01/01/2023", valeur: 500 },
      { date: "02/01/2023", valeur: 700 },
      { date: "03/01/2023", valeur: 600 },
       { date: "01/01/2023", valeur: 1500 },
      { date: "02/01/2023", valeur: 2100 },
      { date: "03/01/2023", valeur: 1800 },
    ],
    benefice: [
      { date: "01/01/2023", valeur: 1000 },
      { date: "02/01/2023", valeur: 1400 },
      { date: "03/01/2023", valeur: 1200 },
       { date: "01/01/2023", valeur: 1500 },
      { date: "02/01/2023", valeur: 2100 },
      { date: "03/01/2023", valeur: 1800 },
    ],
    trajet: [
      { date: "01/01/2023", valeur: 30 },
      { date: "02/01/2023", valeur: 45 },
      { date: "03/01/2023", valeur: 25 },
       { date: "01/01/2023", valeur: 1500 },
      { date: "02/01/2023", valeur: 2100 },
      { date: "03/01/2023", valeur: 1800 },
    ],
  });

  const getChartConfig = (sectionData, title, color) => ({
    data: {
      labels: sectionData.map((item) => item.date),
      datasets: [
        {
          label: title,
          data: sectionData.map((item) => item.valeur),
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
