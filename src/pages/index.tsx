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
              backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
          
                if (!chartArea) {
                  return "rgba(255, 99, 132, 0.2)"; // Cor padrão caso chartArea não esteja disponível
                }
          
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, "rgb(95, 39, 51)"); // Cor escura no topo
                gradient.addColorStop(1, "rgba(255, 99, 132, 0.2)"); // Cor mais clara na parte inferior
          
                return gradient;
              },
              fill: "false",
            },
            {
              label: "Dataset 2",
              data: generateData(),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
          
                if (!chartArea) {
                  return "rgba(54, 162, 235, 0.2)"; // Cor padrão caso chartArea não esteja disponível
                }
          
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, "rgb(28, 64, 103)"); // Cor escura no topo
                gradient.addColorStop(1, "rgba(54, 162, 235, 0.2)"); // Cor mais clara na parte inferior
          
                return gradient;
              },
              fill: "false",
            },
            {
              label: "Dataset 3",
              data: generateData(),
              borderColor: "rgba(255, 159, 64, 1)",
              backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
          
                if (!chartArea) {
                  return "rgba(255, 159, 64, 0.2)"; // Cor padrão caso chartArea não esteja disponível
                }
          
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, "rgb(205, 115, 38)"); // Cor escura no topo
                gradient.addColorStop(1, "rgba(255, 159, 64, 0.2)"); // Cor mais clara na parte inferior
          
                return gradient;
              },
              fill: "false",
            },
            {
              label: "Dataset 4",
              data: generateData(),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
          
                if (!chartArea) {
                  return "rgba(75, 192, 192, 0.2)"; // Cor padrão caso chartArea não esteja disponível
                }
          
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, "rgb(19, 121, 121)"); // Cor escura no topo
                gradient.addColorStop(1, "rgba(75, 192, 192, 0.2)"); // Cor mais clara na parte inferior
          
                return gradient;
              },
              fill: "false",
            },
            {
              label: "Dataset 5",
              data: generateData(),
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
          
                if (!chartArea) {
                  return "rgba(153, 102, 255, 0.2)"; // Cor padrão caso chartArea não esteja disponível
                }
          
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, "rgb(83, 49, 156)"); // Cor escura no topo
                gradient.addColorStop(1, "rgba(153, 102, 255, 0.2)"); // Cor mais clara na parte inferior
          
                return gradient;
              },
              fill: "false",
            },
            {
              label: "Dataset 6",
              data: generateData(),
              borderColor: "rgba(255, 159, 64, 1)",
              backgroundColor: function(context) {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
          
                if (!chartArea) {
                  return "rgba(255, 159, 64, 0.2)"; // Cor padrão caso chartArea não esteja disponível
                }
          
                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                gradient.addColorStop(0, "rgb(205, 115, 38)"); // Cor escura no topo
                gradient.addColorStop(1, "rgba(255, 159, 64, 0.2)"); // Cor mais clara na parte inferior
          
                return gradient;
              },
              fill: "false",
            },
          ],
        };

        const mes = "Outubro"

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
                    return allowedTicks.includes(value) ? `${value}K` : null;
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
                radius: 0, // Sem pontos visíveis na linha
                hoverRadius: 6, // Tamanho da bolinha ao passar o mouse
                hoverBorderWidth: 2, // Largura da borda ao passar o mouse
                hoverBackgroundColor: function (context) {
                  // Define a cor de fundo da bolinha como a cor da linha
                  return context.raw ? context.dataset.borderColor : "transparent";
                },
                hoverBorderColor: "#ffffff", // Define a borda branca ao passar o mouse
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
              tooltip: {
                backgroundColor: "#ffffff", // Cor de fundo do tooltip
                titleColor: "rgb(80, 78, 78)", // Cor do título
                bodyColor: "rgb(0, 0, 0)", // Cor do texto principal
                // borderColor: "rgba(255, 255, 255, 0.5)", // Cor da borda
                borderWidth: 1, // Largura da borda
                padding: 10, // Espaçamento interno
                cornerRadius: 5, // Arredondamento do tooltip
                callbacks: {
                  title: function (tooltipItems) {
                    // Personaliza o título do tooltip
                    //return `Data: ${tooltipItems[0].label}`;
                    return ["Nesse mês", `${mes}`];
                  },
                  label: function (tooltipItem) {
                    // Personaliza o conteúdo principal
                    return `R$ ${tooltipItem.raw}`;
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

        const createCustomLegend = (chart: Chart) => {
          const legendContainer = document.getElementById("legend") as HTMLElement;
          if (legendContainer) {
            legendContainer.innerHTML = ""; // Limpa a legenda existente
        
            // Variável de controle para o estado atual
            let activeDatasetIndex: number | null = null;
        
            chart.data.datasets.forEach((dataset, index) => {
              // Define o fill inicial como false para todos os datasets
              dataset.fill = false;
        
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
        
              // Alterna a visibilidade dos datasets ao clicar no item da legenda
              legendItem.addEventListener("click", () => {
                if (activeDatasetIndex === index) {
                  // Se já estiver mostrando apenas esse dataset, volta a mostrar todos
                  chart.data.datasets.forEach((d) => (d.fill = false)); // Define fill como false para todos
                  chart.data.datasets.forEach((_, i) => {
                    const meta = chart.getDatasetMeta(i);
                    meta.hidden = false; // Mostra todos os datasets
                  });
                  activeDatasetIndex = null; // Reseta o estado ativo
                } else {
                  // Caso contrário, esconde todos e mostra apenas o dataset clicado
                  chart.data.datasets.forEach((d, i) => {
                    d.fill = i === index ? "start" : false; // Define fill como "start" apenas para o clicado
                    const meta = chart.getDatasetMeta(i);
                    meta.hidden = i !== index; // Esconde todos exceto o clicado
                  });
                  activeDatasetIndex = index; // Atualiza o estado ativo
                }
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
          <div id="legend" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}></div>
      </div>
    </>
  );
}
