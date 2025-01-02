import { useEffect, useRef } from "react";
import { Chart, ChartOptions, ChartData, registerables } from "chart.js";

// Registrar os componentes necessários do Chart.js
Chart.register(...registerables);

export default function VerticalBarChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  // Utils
  const numbers = ({ count, min, max }: { count: number, min: number, max: number }) => {
    const numbersArray: number[] = [];
    for (let i = 0; i < count; i++) {
      numbersArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return numbersArray;
  };

  const months = ({ count }: { count: number }) => {
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const monthsArray = [];
    for (let i = 0; i < count; i++) {
      monthsArray.push(monthNames[i % 12]);
    }
    return monthsArray;
  };

  // const rand = (min: number, max: number) => {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  // const namedColor = (index: number) => {
  //   const colors = [
  //     "red", "blue", "green", "orange", "purple", "pink", "yellow", "brown", "grey", "cyan"
  //   ];
  //   return colors[index % colors.length];
  // };

  const transparentize = (color: string, opacity: number) => {
    const hexToRgb = (hex: string) => {
      const match = /^#([0-9A-F]{6})$/i.exec(hex);
      if (!match) return null;
      const r = parseInt(match[1].substring(0, 2), 16);
      const g = parseInt(match[1].substring(2, 4), 16);
      const b = parseInt(match[1].substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };
  
    return hexToRgb(color);
  };

  const CHART_COLORS = {
    red: "#FF5733",
    blue: "#33C1FF",
    green: "#33FF57",
    orange: "#FF8C33",
    purple: "#9B33FF",
    pink: "#FF33D1",
    yellow: "#FFEB33",
    brown: "#9E5B3C",
    grey: "#7D7D7D",
    cyan: "#33FFCE"
  };
  // Utils

  // Definição dos dados e das ações
  // const actions = [
  //   {
  //     name: "Randomize",
  //     handler(chart: Chart) {
  //       chart.data.datasets.forEach((dataset) => {
  //         dataset.data = numbers({ count: chart.data.labels!.length, min: 10, max: 50 });
  //       });
  //       chart.update();
  //     },
  //   },
  //   {
  //     name: "Add Dataset",
  //     handler(chart: Chart) {
  //       const data = chart.data;
  //       const dsColor = namedColor(chart.data.datasets.length);
  //       const newDataset = {
  //         label: "Dataset " + (data.datasets.length + 1),
  //         backgroundColor: transparentize(dsColor, 0.5),
  //         borderColor: dsColor,
  //         borderWidth: 1,
  //         data: numbers({ count: data.labels!.length, min: 10, max: 50 }),
  //       };
  //       chart.data.datasets.push(newDataset);
  //       chart.update();
  //     },
  //   },
  //   {
  //     name: "Add Data",
  //     handler(chart: Chart) {
  //       const data = chart.data;
  //       if (data.datasets.length > 0) {
  //         data.labels = months({ count: data.labels!.length + 1 });

  //         for (let index = 0; index < data.datasets.length; ++index) {
  //           data.datasets[index].data.push(rand(10, 50));
  //         }

  //         chart.update();
  //       }
  //     },
  //   },
  //   {
  //     name: "Remove Dataset",
  //     handler(chart: Chart) {
  //       chart.data.datasets.pop();
  //       chart.update();
  //     },
  //   },
  //   {
  //     name: "Remove Data",
  //     handler(chart: Chart) {
  //       chart.data.labels!.splice(-1, 1); // remove the label first

  //       chart.data.datasets.forEach((dataset) => {
  //         dataset.data.pop();
  //       });

  //       chart.update();
  //     },
  //   },
  // ];

  const DATA_COUNT = 12;
  const NUMBER_CFG = { count: DATA_COUNT, min: 10, max: 50 };

  const labels = months({ count: 12 });

  const data: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: numbers(NUMBER_CFG),
        borderColor: CHART_COLORS.red,
        backgroundColor: transparentize(CHART_COLORS.red, 1),
        borderRadius: 10,
        borderSkipped: false,
      },
      {
        label: "Dataset 2",
        data: numbers(NUMBER_CFG),
        borderColor: CHART_COLORS.blue,
        backgroundColor: transparentize(CHART_COLORS.blue, 1),
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const config: ChartOptions = {
    type: "bar",
    data: data,
    options: {
      scales: {
        x: {
          ticks: {
            callback: function (value, index) {
              const month = labels[index];
              const consumption = "Kg/Consumo";
              // Retorna um array para criar múltiplas linhas
              return [month, consumption];
            },
            font: {
              size: 12,
              lineHeight: 1.5, // Controla o espaçamento entre as linhas
            },
            beforeDraw: function (chart) {
              const ctx = chart.ctx;
              const ticks = chart.scales['x'].ticks;
              ticks.forEach((tick, index) => {
                // Mudar o estilo do mês (negrito)
                ctx.save();
                ctx.font = 'bold 12px Arial'; // Negrito para o mês
                ctx.fillText(tick.label[0], tick.x, tick.y);
                ctx.restore();
  
                // Deixar "Kg/Consumo" normal
                ctx.save();
                ctx.font = 'normal 12px Arial'; // Fonte normal para "Kg/Consumo"
                ctx.fillText(tick.label[1], tick.x, tick.y + 15); // Ajuste o Y para separar as linhas
                ctx.restore();
              });
            },
          },
          grid: {
            display: false, // Desativa as linhas de fundo verticais
          },
        },
        y: {
          ticks: {
            stepSize: 1, // Define o intervalo fixo entre os ticks
            callback: function (value) {
              const allowedTicks = [10, 20, 30, 40, 50];
              return allowedTicks.includes(value) ? `${value}Kg` : null;
            },
          },
          beginAtZero: true, // Inicia o eixo Y no valor 0
          min: 0,           // Define o valor mínimo do eixo Y
          max: 50,          // Define o valor máximo do eixo Y
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            boxWidth: 10, // Tamanho dos quadrados das legendas
            boxHeight: 10, // Altura dos quadrados das legendas (opcional)
            padding: 10, // Espaçamento entre o quadrado e o texto da legenda
            boxBorderRadius: 50,
            generateLabels: (chart) => {
              // Customização das labels, exemplo para mudar a cor do quadrado
              return chart.data.datasets.map((dataset, index) => ({
                text: dataset.label,
                fillStyle: dataset.borderColor, // Muda a cor do quadrado para a borda do dataset
                strokeStyle: dataset.borderColor, // Cor da borda do quadrado
                lineWidth: 2, // Largura da borda
                datasetIndex: index,
              }));
            },
          },
          onClick: null // Desabilita a funcionalidade de clique nas legendas
        },
        // title: {
        //   display: true,
        //   text: "Chart.js Bar Chart",
        // },
        tooltip: {
          backgroundColor: "#ffffff", // Cor de fundo do tooltip
          titleColor: "rgb(0, 0, 0)", // Cor do título
          bodyColor: "rgb(0, 0, 0)", // Cor do texto principal
          // borderColor: "rgba(255, 255, 255, 0.5)", // Cor da borda
          borderWidth: 1, // Largura da borda
          padding: 10, // Espaçamento interno
          cornerRadius: 5, // Arredondamento do tooltip
          callbacks: {
            title: function () {
              return null;
            },
            label: function (tooltipItem) {
              // Personaliza o conteúdo principal
              return [`R$ ${tooltipItem.raw}`];
            },
          },
          bodyFont: {
            weight: 'bold', // Define o texto do conteúdo como negrito
            size: 15,
          },
          titleFont: {
            size: 9, // Define o tamanho do título (opcional)
            weight: 'normal', // Mantém o título com peso normal (opcional)
          },
          displayColors: false,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, config);

      // Cleanup chart instance when component is unmounted
      return () => {
        chart.destroy();
      };
    }
  }, [config]);

  return (
    <>
      <canvas ref={chartRef} style={{ height: "300px", width: "100%" }}></canvas>
    </>
  )
}