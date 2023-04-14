/**
 * FILE dedicato alle richieste di grafici, esportati in HomeInsights
 */

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Legend,
  BarController,
  BarElement,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  BarElement,
  Title
);

//funzioni da esportare per creare i grafici delle risposte

// --------- LIFETIME REQUESTS ---------
function CityGraph({ data }) {
  const cities = Object.keys(data[0].values[0].value);
  const quantities = Object.values(data[0].values[0].value);

  const chartData = {
    labels: cities,
    datasets: [
      {
        label: "# of Votes",
        data: quantities,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}

function CountryGraph({ data }) {
  const countries = Object.keys(data[1].values[0].value);
  const quantities = Object.values(data[1].values[0].value);

  const chartData = {
    labels: countries,
    datasets: [
      {
        label: "# of Votes",
        data: quantities,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}

// --------- LANGUAGE COUNT ---------

function LangChart({ data }) {
  const languages = Object.keys(data[3].values[0].value);
  const quantities = Object.values(data[3].values[0].value);

  const chartData = {
    labels: languages,
    datasets: [
      {
        label: "# of Votes",
        data: quantities,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}

// --------- FOLLOWER COUNT ---------
/**
 * TODO phil:
 * - aggiungere state che prenda il numero vero di follower dalla navbar in FollowerCountGraph
 */

function FollowerCountGraph({ data }) {
  const INITIAL_Y_VALUE = 300; //da cambiare con valore reale follower
  const labels = data[0].values.map(v => v.end_time.slice(0, 10));
  const firstValue = data[0].values[0].value;
  const yValues = [INITIAL_Y_VALUE + firstValue];

  for (let i = 1; i < data[0].values.length; i++) {
    const value = data[0].values[i].value;
    const previousYValue = yValues[i - 1];
    const newYValue = previousYValue + value;
    yValues.push(newYValue);
  }
  const dataValues = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: data[0].title,
        data: yValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: data[0].title,
      },
    },
  };
  return <Line options={options} data={dataValues} />;
}

// --------- GENDER AGE COUNT ---------
function GenderAgeChart({ data }) {
  // Estraiamo i dati dal JSON
  const value = data[2].values[0].value;
  const ageRanges = [
    ...new Set(Object.keys(value).map(key => key.split(".")[1])),
  ];

  // Creiamo i dataset per il grafico
  const datasets = [
    { label: "M", backgroundColor: "rgba(255, 99, 132, 0.5)", data: [] },
    {
      label: "F",
      backgroundColor: "rgba(54, 162, 235, 0.5)",
      data: [],
    },
    {
      label: "U",
      backgroundColor: "rgba(255, 206, 86, 0.5)",
      data: [],
    },
  ];

  // Popoliamo i dataset con i valori del JSON
  ageRanges.forEach(ageRange => {
    const ageData = { M: 0, F: 0, U: 0 };
    Object.keys(value).forEach(key => {
      const [gender, age] = key.split(".");
      if (age === ageRange) {
        ageData[gender] += value[key];
      }
    });
    datasets[0].data.push(ageData.M);
    datasets[1].data.push(ageData.F);
    datasets[2].data.push(ageData.U);
  });

  // Configurazione delle opzioni del grafico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: data[2].title,
      },
    },
    scales: {
      x: {
        stacked: true,
        labels: ageRanges,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Creiamo il set di dati per il grafico
  const chartData = {
    labels: ageRanges,
    datasets,
  };

  return <Bar options={options} data={chartData} />;
}

/** --------------++++----------------
 *
 *
 *
 *
 *  AREA DI QUARANTENA, ATTENZIONE!
 *
 *
 *
 */

// --------- PROFILE IMPRESSION ---------
/*function AccountImpressionGraph({ data }) {
  // Estraiamo i dati dal JSON
  const labels = data[0].values.map(value => value.end_time);
  const dataValues = data[0].values.map(value => value.value);

  // Configurazione delle opzioni del grafico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: data[0].title,
      },
    },
  };

  // Creiamo il set di dati per il grafico
  const chartData = {
    labels,
    datasets: [
      {
        label: data[0].title,
        data: dataValues,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={chartData} />;
}*/

export {
  CountryGraph,
  CityGraph,
  LangChart,
  FollowerCountGraph,
  GenderAgeChart,
};
