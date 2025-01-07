import { useEffect, useRef, useState } from "react";
import { Chart, ChartConfiguration, registerables } from "chart.js";

Chart.register(...registerables);

type LineChartProps = {
  style?: React.CSSProperties;
  ticks: number[];
  unitOfMeasure: string;
  labels: string[]
  showLegends?: boolean
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill?: boolean;
  }[];
}

export default function LineChart(props: LineChartProps) {
  const { style, datasets, ticks, unitOfMeasure, labels, showLegends} = props
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [activeDatasetIndex, setActiveDatasetIndex] = useState<number | null>(null);

  const maxTickValue = Math.max(...ticks);
  const minTickValue = Math.min(...ticks);

  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.borderColor,
      backgroundColor: function (context: { chart: Chart }) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
      
        // Extrair as cores RGB do borderColor
        const colorValues = dataset.borderColor.match(/\d+/g);

        // Se colorValues ou chartArea não estiverem disponíveis, não cria o gradiente
        if (!colorValues || !chartArea) return;
        
        const [r, g, b] = colorValues.map((value) => Number(value));
        
        // Criar o gradiente baseado na cor
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      
        gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`); // Cor escura no topo
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.1)`); // Cor mais clara na parte inferior
        return gradient;
      },
      fill: showLegends ? false : dataset.fill ?? false,
    })),
  };

  const mes = "Outubro"

  const hoverLine = {
    id: 'hoverLine',
    afterDatasetsDraw(chart: Chart) {
      const { ctx, tooltip, chartArea: { bottom}, scales: { x, y } } = chart;
      
      if (tooltip) {
        if(tooltip?._active. length > 0){
          const dataPoint = tooltip.dataPoints[0];
          const xCoor = x.getPixelForValue(tooltip. dataPoints [0].dataIndex);
          const yCoor = y. getPixelForValue(tooltip.dataPoints[0].parsed.y);
  
          const dataset = chart.data.datasets[dataPoint.datasetIndex];
          const borderColor = dataset.borderColor;
          
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = `${borderColor}`;
          ctx.setLineDash([3, 3]);
          ctx.moveTo(xCoor, yCoor);
          ctx. lineTo(xCoor, bottom);
          ctx.stroke();
          ctx. closePath();
          ctx.setLineDash([]);
        }
      }
    }
  }

  const config: ChartConfiguration = {
    type: "line" as const,
    data,
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false
          },
          ticks: {
            padding: 10,
          },
        },
        y: {
          ticks: {
            stepSize: 1,
            callback: function (value) {
              if (unitOfMeasure === 'K') {
                const teste = Number(value) / 1000
                return ticks.includes(Number(value)) ? `${teste}${unitOfMeasure}` : null;
              } else {
                return ticks.includes(Number(value)) ? `${value}${unitOfMeasure}` : null;
              }
            },
            padding: 20,
          },
          beginAtZero: true,
          min: minTickValue,
          max: maxTickValue,
          border: {
            display: false
          }
        },
      },
      elements: {
        line: {
          tension: 0.5,
        },
        point: {
          radius: 0,
          hoverRadius: 6,
          hoverBorderWidth: 2,
          hoverBackgroundColor: function(context) {
            const dataset = context.dataset;
            const borderColor = dataset.borderColor;

            if (typeof borderColor === "string") {
              return borderColor;
            }
          },
          hoverBorderColor: "#ffffff",
        },
      },
      plugins: {
        filler: {
          propagate: true,
        },
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "rgb(80, 78, 78)",
          bodyColor: "rgb(0, 0, 0)", 
          borderWidth: 1,
          borderColor: "#00000026",
          cornerRadius: 5, 
          padding: 10, 
          callbacks: {
            title: function (tooltipItems) {
              return ["Nesse mês", `${mes}`];
            },
            label: function (tooltipItem) {
              // Personaliza o conteúdo principal
              return `R$ ${tooltipItem.raw}`;
            },
          },
          bodyFont: {
            weight: 'bold',
            size: 15,
          },
          titleFont: {
            size: 9,
            weight: 'normal',
          },
          displayColors: false,
        },
      },
    },
    plugins: [hoverLine]
  };

  const toggleDatasetVisibility = (index: number) => {
    if (!chartInstanceRef.current) return;

    const chart = chartInstanceRef.current;

    if (activeDatasetIndex === index) {
      // Se já estiver mostrando apenas esse dataset, volta a mostrar todos
      chart.data.datasets.forEach((d) => (d.fill = false));
      chart.data.datasets.forEach((_, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.hidden = false; // Mostra todos os datasets
      });
      setActiveDatasetIndex(null); // Reseta o estado ativo
    } else {
      // Caso contrário, esconde todos e mostra apenas o dataset clicado
      chart.data.datasets.forEach((d, i) => {
        d.fill = i === index ? "start" : false; // Define fill como "start" apenas para o clicado
        const meta = chart.getDatasetMeta(i);
        meta.hidden = i !== index; // Esconde todos exceto o clicado
      });
      setActiveDatasetIndex(index); // Atualiza o estado ativo
    }

    chart.update();
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      
      chartInstanceRef.current = new Chart(chartRef.current, config);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [datasets, labels]);

  return (
    <>
      <canvas ref={chartRef} style={style}></canvas>
      <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ display: "flex", gap: "15px" }}> 
          {showLegends ? 
          (
            datasets.map((dataset, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                  opacity: activeDatasetIndex === null || activeDatasetIndex === index ? 1 : 0.5,
                }}
                onClick={() => toggleDatasetVisibility(index)}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: activeDatasetIndex === null || activeDatasetIndex === index ? dataset.borderColor :  "gray",
                    borderRadius: "20%",
                  }}
                ></div>
                <span>{dataset.label}</span>
              </div>
            ))
          ): null}
        </div>
      </div>
    </>
  );
}


 //   {
    //     label: "Dataset 1",
    //     data: generateData(),
    //     borderColor: "rgba(255, 99, 132, 1)",
    //     backgroundColor: function(context) {
    //       const chart = context.chart;
    //       const { ctx, chartArea } = chart;

    //       if (!chartArea) {
    //           return "rgba(255, 99, 132, 0.2)"; // Cor padrão caso chartArea não esteja disponível
    //       }

    //       // Extrair as cores RGB do borderColor
    //       const colorValues = borderColor.match(/\d+/g); // Isso vai extrair os valores de R, G, B como array de strings
    //       const [r, g, b] = colorValues.map(Number); // Converte de string para número

    //       // Criar o gradiente baseado na cor extraída
    //       const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          
    //       // Adicionar stops de cor com base na cor de borderColor
    //       gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`); // Cor escura no topo (usa a cor extraída)
    //       gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.2)`); // Cor mais clara na parte inferior (transparente)

    //       return gradient;
    //     },
    //     fill: "false",
    //   },
    //   {
    //     label: "Dataset 2",
    //     data: generateData(),
    //     borderColor: "rgba(54, 162, 235, 1)",
    //     backgroundColor: function(context) {
    //       const chart = context.chart;
    //       const { ctx, chartArea } = chart;
    
    //       if (!chartArea) {
    //         return "rgba(54, 162, 235, 0.2)"; // Cor padrão caso chartArea não esteja disponível
    //       }
    
    //       const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    //       gradient.addColorStop(0, "rgb(28, 64, 103)"); // Cor escura no topo
    //       gradient.addColorStop(1, "rgba(54, 162, 235, 0.2)"); // Cor mais clara na parte inferior
    
    //       return gradient;
    //     },
    //     fill: "false",
    //   },
    //   {
    //     label: "Dataset 3",
    //     data: generateData(),
    //     borderColor: "rgba(255, 159, 64, 1)",
    //     backgroundColor: function(context) {
    //       const chart = context.chart;
    //       const { ctx, chartArea } = chart;
    
    //       if (!chartArea) {
    //         return "rgba(255, 159, 64, 0.2)"; // Cor padrão caso chartArea não esteja disponível
    //       }
    
    //       const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    //       gradient.addColorStop(0, "rgb(205, 115, 38)"); // Cor escura no topo
    //       gradient.addColorStop(1, "rgba(255, 159, 64, 0.2)"); // Cor mais clara na parte inferior
    
    //       return gradient;
    //     },
    //     fill: "false",
    //   },
    //   {
    //     label: "Dataset 4",
    //     data: generateData(),
    //     borderColor: "rgba(75, 192, 192, 1)",
    //     backgroundColor: function(context) {
    //       const chart = context.chart;
    //       const { ctx, chartArea } = chart;
    
    //       if (!chartArea) {
    //         return "rgba(75, 192, 192, 0.2)"; // Cor padrão caso chartArea não esteja disponível
    //       }
    
    //       const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    //       gradient.addColorStop(0, "rgb(19, 121, 121)"); // Cor escura no topo
    //       gradient.addColorStop(1, "rgba(75, 192, 192, 0.2)"); // Cor mais clara na parte inferior
    
    //       return gradient;
    //     },
    //     fill: "false",
    //   },
    //   {
    //     label: "Dataset 5",
    //     data: generateData(),
    //     borderColor: "rgba(153, 102, 255, 1)",
    //     backgroundColor: function(context) {
    //       const chart = context.chart;
    //       const { ctx, chartArea } = chart;
    
    //       if (!chartArea) {
    //         return "rgba(153, 102, 255, 0.2)"; // Cor padrão caso chartArea não esteja disponível
    //       }
    
    //       const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    //       gradient.addColorStop(0, "rgb(83, 49, 156)"); // Cor escura no topo
    //       gradient.addColorStop(1, "rgba(153, 102, 255, 0.2)"); // Cor mais clara na parte inferior
    
    //       return gradient;
    //     },
    //     fill: "false",
    //   },
    //   {
    //     label: "Dataset 6",
    //     data: generateData(),
    //     borderColor: "rgba(255, 159, 64, 1)",
    //     backgroundColor: function(context) {
    //       const chart = context.chart;
    //       const { ctx, chartArea } = chart;
    
    //       if (!chartArea) {
    //         return "rgba(255, 159, 64, 0.2)"; // Cor padrão caso chartArea não esteja disponível
    //       }
    
    //       const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    //       gradient.addColorStop(0, "rgb(205, 115, 38)"); // Cor escura no topo
    //       gradient.addColorStop(1, "rgba(255, 159, 64, 0.2)"); // Cor mais clara na parte inferior
    
    //       return gradient;
    //     },
    //     fill: "false",
    //   },
    // ],
  
