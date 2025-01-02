import { useEffect, useRef } from "react";
import { Chart, ChartData, registerables, ChartConfiguration } from "chart.js";

Chart.register(...registerables);

interface VerticalBarChartProps {
  labels: string[]
  label: string
  dataset: number[]
  style?: React.CSSProperties;
  chartColor: string
  ticks: number[];
}

export default function VerticalBarChart(props: VerticalBarChartProps) {
  const { labels, label, dataset, style, chartColor, ticks } = props
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const data: ChartData = {
    labels,
    datasets: [
      {
        label,
        data: dataset,
        backgroundColor: chartColor,
        borderRadius: 10,
        borderSkipped: false,
      }
    ],
  };

  const config: ChartConfiguration = {
    type: "bar",
    data: data,
    options: {
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            padding: 20
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            stepSize: 0.1,
            callback: function (value) {
              if (typeof value === "number") {
                return ticks.some(tick => Math.abs(tick - value) < 0.01) ? value.toFixed(1) : null;
              }
              return null;
            },
            padding: 20
          },
          beginAtZero: true, 
          min: 1.1,
          max: 2,
          grid: {
            tickLength: 0,
          }
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "rgb(0, 0, 0)",
          bodyColor: "rgb(0, 0, 0)", 
          borderWidth: 1,
          borderColor: "#00000026",
          cornerRadius: 5, 
          padding: 10, 
          callbacks: {
            title: function () {
              return '';
            },
            label: function (tooltipItem) {
              return [`${tooltipItem.raw}`];
            },
          },
          bodyFont: {
            weight: 'bold',
            size: 15,
          },
          displayColors: false,
        },
      },
    },
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, config);
      return () => {
        chart.destroy();
      };
    }
  }, [config]);

  return (
    <>
      <canvas ref={chartRef} style={style}></canvas>
    </>
  )
}

// import { useEffect, useRef } from "react";
// import { Chart, ChartOptions, ChartData, registerables, ChartConfiguration } from "chart.js";

// Chart.register(...registerables);

// interface VerticalBarChartProps {
//   labels: string[]
//   label: string
//   dataset: number[]
//   style?: React.CSSProperties;
//   chartColor: string
//   ticks: number[];
// }

// export default function VerticalBarChart(props: VerticalBarChartProps) {
//   const { labels, label, dataset, style, chartColor, ticks } = props
//   const chartRef = useRef<HTMLCanvasElement | null>(null);

//   const data: ChartData = {
//     labels,
//     datasets: [
//       {
//         label,
//         data: dataset,
//         backgroundColor: chartColor,
//         borderRadius: 10,
//         borderSkipped: false,
//       }
//     ],
//   };

//   const config: ChartConfiguration = {
//     type: "bar",
//     data: data,
//     options: {
//       scales: {
//         x: {
//           ticks: {
//             font: {
//               size: 12,
//             },
//             padding: 20
//           },
//           grid: {
//             display: false, // Desativa as linhas de fundo verticais
//           },
//         },
//         y: {
//           ticks: {
//             stepSize: 0.1, // Define um passo pequeno para cobrir os números decimais
//             callback: function (value) {
//               if (typeof value === "number") {
//                 return ticks.some(tick => Math.abs(tick - value) < 0.01) ? value.toFixed(1) : null;
//               }
//               return null;
//             },
//             padding: 20
//           },
//           beginAtZero: true, // Inicia o eixo Y no valor 0
//           min: 1.1,           // Define o valor mínimo do eixo Y
//           max: 2,          // Define o valor máximo do eixo Y
//           grid: {
//             tickLength: 0,
//           }
//         },
//       },
//       responsive: true,
//       plugins: {
//         legend: {
//           display: false,
//         },
//         tooltip: {
//           backgroundColor: "#ffffff",
//           titleColor: "rgb(0, 0, 0)",
//           bodyColor: "rgb(0, 0, 0)", 
//           borderWidth: 1,
//           borderColor: "#00000026",
//           cornerRadius: 5, 
//           padding: 10, 
//           callbacks: {
//             title: function () {
//               return '';
//             },
//             label: function (tooltipItem) {
//               return [`${tooltipItem.raw}`];
//             },
//           },
//           bodyFont: {
//             weight: 'bold',
//             size: 15,
//           },
//           displayColors: false,
//         },
//       },
//     },
//   };

//   useEffect(() => {
//     if (chartRef.current) {
//       const chart = new Chart(chartRef.current, config);
//       return () => {
//         chart.destroy();
//       };
//     }
//   }, [config]);

//   return (
//     <>
//       <canvas ref={chartRef} style={style}></canvas>
//     </>
//   )
// }