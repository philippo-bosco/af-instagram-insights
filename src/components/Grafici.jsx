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
  BarController,
  BarElement,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";
import secureLocalStorage from "react-secure-storage";
import chroma from "chroma-js";

ChartJS.register(
  ArcElement,
  Tooltip,
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
  var colors = [];
  for (var i = 0; i < cities.length; i++) {
    var randomColor = chroma.random();
    colors.push("rgba(" + randomColor.rgb() + ",0.7)");
  }
  const chartData = {
    labels: cities,
    datasets: [
      {
        label: "profili",
        data: quantities,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}

function CountryGraph({ data }) {
  const countries = Object.keys(data[1].values[0].value);
  const quantities = Object.values(data[1].values[0].value);
  var colors = [];

  for (var i = 0; i < countries.length; i++) {
    var randomColor = chroma.random();
    colors.push("rgba(" + randomColor.rgb() + ",0.7)");
  }
  const chartData = {
    labels: countries,
    datasets: [
      {
        label: "profili",
        data: quantities,
        backgroundColor: colors,

        borderColor: ["rgba(00, 00, 00,1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pie data={chartData} />
    </>
  );
}

// --------- LANGUAGE COUNT ---------

function LangChart({ data }) {
  const languages = Object.keys(data[3].values[0].value);
  const quantities = Object.values(data[3].values[0].value);
  var colors = [];
  for (var i = 0; i < languages.length; i++) {
    var randomColor = chroma.random();
    colors.push("rgba(" + randomColor.rgb() + ",0.7)");
  }
  const chartData = {
    labels: languages,
    datasets: [
      {
        label: "profili",
        data: quantities,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
}

// --------- FOLLOWER COUNT ---------

function FollowerCountGraph({ data }) {
  const FINAL_Y_VALUE = secureLocalStorage.getItem("Nav");
  const labels = data[0].values.map(v => v.end_time.slice(0, 10));
  const lastValue = data[0].values[data[0].values.length - 1].value;
  const yValues = [FINAL_Y_VALUE - lastValue];

  for (let i = data[0].values.length - 2; i >= 0; i--) {
    const value = data[0].values[i].value;
    const nextYValue = yValues[yValues.length - 1];
    const newYValue = nextYValue - value;
    yValues.push(newYValue);
  }
  const rgbColor = chroma.random().rgb();
  const dataValues = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: data[0].title,
        data: yValues.reverse(),

        borderColor: "rgba(" + rgbColor + ")",
        backgroundColor: "rgba(226, 223, 223, 0.2)",
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
    { label: "Maschio", backgroundColor: "rgba(0, 115, 255)", data: [] },
    {
      label: "Femmina",
      backgroundColor: "rgba(252, 121, 226)",
      data: [],
    },
    {
      label: "Non Specificato",
      backgroundColor: "rgba(99, 0, 80)",
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
