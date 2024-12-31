// components/VerticalBarChart.tsx

import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import { ChartOptions, ChartData } from 'chart.js';

// Definir o tipo para os dados
interface Dataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export default function HorizontalBarChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Verifique se o chartRef está atual
    if (chartRef.current) {
      // Dados e configurações do gráfico
      const data: ChartData = {
        labels: ['PRÉ O', 'PRÉ 1', 'INICIAL', 'CRESC 1', 'CRESC 2', 'TERM 1', 'TERM 2'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [12000, 30000, 24000, 38000, 4000, 32000, 10000],
            // borderColor: 'red',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderRadius: 10,
          },
        ],
      };

      const options: ChartOptions = {
        indexAxis: 'y', // Gráfico horizontal
        elements: {
          // bar: {
          //   borderWidth: 2,
          // },
        },
        scales: {
          y: {
            grid: {
              display: false, // Desativa as linhas de fundo verticais
            },
          },
          x: {
            ticks: {
              callback: function (value) {
                const allowedTicks = [0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
                // Retorna o valor se ele estiver na lista de allowedTicks
                return allowedTicks.includes(value) ? value.toString() : '';
              },
            },
            beginAtZero: true, // Inicia o eixo X no valor 0
            min: 0,           // Define o valor mínimo do eixo X
            max: 40000,       // Define o valor máximo do eixo X
          },
          // x: {
          //   ticks: {
          //     callback: function (value) {
          //       // Exibe números apenas para os ticks principais (0, 5000, 10000, etc.)
          //       if (value % 5000 === 0) {
          //         return value;
          //       }
          //       // Não exibe texto para os ticks intermediários
          //       return '';
          //     },
          //   },
          //   grid: {
          //     drawOnChartArea: true, // Garante linhas no gráfico
          //     color: (context) => {
          //       // Linhas principais
          //       if (context.tick.value % 5000 === 0) {
          //         return 'rgba(0, 0, 0, 0.1)'; // Linhas principais (padrão)
          //       }
          //       // Linhas intermediárias
          //       return 'rgba(0, 0, 0, 0.1)'; // Linhas extras mais claras
          //     },
          //     tickLength: 5, // Tamanho do marcador (traço) no eixo X
          //   },
          //   afterBuildTicks: (axis) => {
          //     const ticks = axis.ticks; // Pega os ticks principais
          //     const newTicks = [];
          //     for (let i = 0; i < ticks.length - 1; i++) {
          //       newTicks.push(ticks[i]);
          //       const midpoint = (ticks[i].value + ticks[i + 1].value) / 2;
          //       newTicks.push({ value: midpoint }); // Adiciona ticks intermediários
          //     }
          //     axis.ticks = newTicks; // Atualiza os ticks
          //   },
          // },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }, 
          // title: {
          //   display: true,
          //   text: 'Chart.js Horizontal Bar Chart',
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
      };

      // Inicializar o gráfico
      new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
    }
  }, []);

  return (
    <>
      <canvas ref={chartRef} style={{ height: '300px', width: '100%' }}></canvas>
    </>
  );
}
