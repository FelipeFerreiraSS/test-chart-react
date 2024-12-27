import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef } from "react";
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Filler } from "chart.js";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Filler);

export default function Home() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const inputs = {
          min: 0,
          max: 15,
          count: 31,
          decimals: 2,
        };

        const generateLabels = () => [
          "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", 
          "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 
          "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", 
          "31"
        ];
        const generateData = () =>
          Array.from({ length: inputs.count }, () =>
            Number((Math.random() * (inputs.max - inputs.min) + inputs.min).toFixed(inputs.decimals))
          );

        const data = {
          labels: generateLabels(),
          datasets: [
            {
              label: "Dataset 1",
              data: generateData(),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: "start",
            },
            {
              label: "Dataset 2",
              data: generateData(),
              borderColor: "rgba(16, 234, 74, 1)",
              backgroundColor: "rgba(16, 234, 0.2)",
              fill: "start",
            },
            {
              label: "Dataset 1",
              data: generateData(),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: "start",
            },
            {
              label: "Dataset 2",
              data: generateData(),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: "start",
            },
            {
              label: "Dataset 1",
              data: generateData(),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              fill: "start",
            },
            {
              label: "Dataset 2",
              data: generateData(),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: "start",
            },
          ],
        };

        const config = {
          type: "line" as const,
          data,
          options: {
            scales: {
              x: {
                grid: {
                  display: false, // Desativa as linhas de fundo verticais
                },
              },
              y: {
                ticks: {
                  stepSize: 1, // Define o intervalo fixo entre os ticks
                  callback: function (value) {
                    const allowedTicks = [1, 5, 10, 15];
                    return allowedTicks.includes(value) ? value : null;
                  },
                },
                beginAtZero: true, // Inicia o eixo Y no valor 0
                min: 0,           // Define o valor mínimo do eixo Y
                max: 15,          // Define o valor máximo do eixo Y
              },
            },
            elements: {
              line: {
                tension: 0.2, // Suavidade da linha
              },
              point: {
                radius: 2,
                hoverRadius: 7,
              },
            },
            plugins: {
              filler: {
                propagate: true,
              },
              title: {
                display: true,
                text: "Gráfico de Exemplo",
                position: "bottom" as const,
              },
              legend: {
                display: false, // Desativamos a legenda padrão para usar uma customizada
              },
            },
          },
        };

        const createCustomLegend = (chart: Chart) => {
          const legendContainer = document.getElementById("legend") as HTMLElement;
          if (legendContainer) {
            legendContainer.innerHTML = ""; // Limpa a legenda existente
        
            chart.data.datasets.forEach((dataset, index) => {
              // Criar o contêiner do item da legenda
              const legendItem = document.createElement("div");
              legendItem.style.display = "flex";
              legendItem.style.alignItems = "center";
              legendItem.style.margin = "5px";
              legendItem.style.cursor = "pointer"; // Indicador de que o item é clicável
        
              // Criar o quadrado colorido (ícone da legenda)
              const colorBox = document.createElement("div");
              colorBox.style.width = "15px";
              colorBox.style.height = "15px";
              colorBox.style.backgroundColor = dataset.borderColor as string;
              colorBox.style.borderRadius = "3px"; // Bordas arredondadas
              colorBox.style.marginRight = "10px"; // Espaçamento entre o quadrado e o texto
        
              // Criar o texto com o nome do dataset
              const label = document.createElement("span");
              label.style.fontSize = "14px";
              label.textContent = dataset.label || `Dataset ${index + 1}`;
        
              // Adicionar o quadrado colorido e o texto no contêiner
              legendItem.appendChild(colorBox);
              legendItem.appendChild(label);
        
              // Alterna a visibilidade da linha do dataset ao clicar no item da legenda
              legendItem.addEventListener("click", () => {
                const meta = chart.getDatasetMeta(index);
                meta.hidden = !meta.hidden;
                chart.update();
              });
        
              // Adicionar o item da legenda ao contêiner
              legendContainer.appendChild(legendItem);
            });
          }
        };

        chartInstance.current = new Chart(ctx, config);
        createCustomLegend(chartInstance.current);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <>
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        <canvas ref={chartRef} style={{ height: "200px", width: "100%" }}></canvas>
        <div id="legend"></div>
      </div>
    </>
  );
}
