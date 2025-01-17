// import { useRef } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
// } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// const CHART_COLORS = {
//   red: 'rgba(255, 99, 132, 0.5)',
//   orange: 'rgba(255, 159, 64, 0.5)',
//   yellow: 'rgba(255, 205, 86, 0.5)',
//   green: 'rgba(75, 192, 192, 0.5)',
//   blue: 'rgba(54, 162, 235, 0.5)',
//   purple: 'rgba(153, 102, 255, 0.5)',
//   grey: 'rgba(201, 203, 207, 0.5)'
// };

// type DoughnutChartProps = {
//   valorTotal?: number;
//   style?: React.CSSProperties;
//   data: { label: string; value: number }[];
//   chartColors: string[]
//   label: string
//   drawLabels: boolean
// };

// export default function DoughnutChart(props: DoughnutChartProps) {
//   const { valorTotal, style, data, chartColors, label, drawLabels } = props;
  
//   const chartRef = useRef<ChartJS<"doughnut">>(null);

//   const labels = data.map(item => item.label);
//   const values = data.map(item => item.value);

//   // const chartColorsArray = chartColors
//   //   ? chartColors.map(item => item.value) // Usando as cores personalizadas passadas como parâmetro
//   //   : Object.values(CHART_COLORS); // Se não for passado, usa as cores padrão

//   const doughnutConfig = {
//     responsive: true,
//     maintainAspectRatio: drawLabels ? false : true,
//     layout: {
//       padding: {
//         top: drawLabels ? 20 : 0,
//         bottom: drawLabels ? 20 : 0,
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       }, 
//       tooltip: {
//         enabled: false, // Desativa o tooltip
//       },
//     },
//   };

//   const doughnutData = {
//     labels,
//     datasets: [
//       {
//         label,
//         data: values,
//         backgroundColor: chartColors,
//         borderWidth: 0
//       },
//     ],
//   };

//   const textCenter = {
//     id: 'textCenter',
//     beforeDraw(chart: ChartJS) {
//       const { width } = chart;
//       const { ctx } = chart;

//       let text = '';
      
//       if (valorTotal) {
//         text = `R$ ${valorTotal.toLocaleString('pt-BR', {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         })}`;
//       }
      
//       const fontSize = width === 130 ? '10px' : '16px';

//       ctx.save();
//       ctx.font = `bold ${fontSize} Arial`; //Ajustar fonte com o projeto
//       ctx.fillStyle = 'black'; 
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
  
//       // Calcula o centro do gráfico
//       const centerX = width / 2;
//       const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
  
//       ctx.fillText(text, centerX, centerY);
//       ctx.restore();
//     },
//   };

//   const drawLabelsPlugin = {
//     id: 'doughnutLabels',
//     afterDraw(chart: ChartJS) {
//       const { ctx, chartArea, data } = chart;

//       if (!ctx || !data) return;
  
//       // Configurações para o texto e linha
//       const fontSize = 12;
//       const lineWidth = 1;
//       const pointSize = 3;
//       const lineLength = 100;

//       ctx.font = `${fontSize}px Arial`;
//       ctx.textBaseline = 'middle';
//       ctx.fillStyle = 'black';
//       ctx.lineWidth = lineWidth;
//       ctx.strokeStyle = 'black';
  
//       // Pega as coordenadas de cada fatia
//       chart.getDatasetMeta(0).data.forEach((element, index) => {
//         const arc = element as ArcElement; // Tipagem

//         const angle = (arc.startAngle + arc.endAngle) / 2;
  
//         const offset = -10; // Ajuste para aproximar a bolinha
//         const x2 = arc.x + Math.cos(angle) * (arc.outerRadius + offset); 
//         const y2 = arc.y + Math.sin(angle) * (arc.outerRadius + offset);
        
//         // Determina o lado (direita ou esquerda)
//         const isLeftSide = Math.cos(angle) < 0;
      
//         const labelX = isLeftSide ? x2 - lineLength : x2 + lineLength; // Posição do texto (ajusta horizontalmente)
//         const labelY = y2;
  
//         // Desenha a linha
//         ctx.beginPath();
//         ctx.lineTo(x2, y2);
//         ctx.lineTo(labelX, labelY);
//         ctx.stroke();
  
//         // Desenha o ponto na extremidade
//         ctx.beginPath();
//         ctx.arc(x2, y2, pointSize, 0, 2 * Math.PI);
//         ctx.fill();
  
//         // Rótulos de texto
//         const labels = data.labels as string[];
//         const label = labels[index];
//         const percentage = `${(data.datasets[0].data[index] as number).toFixed(1).replace('.', ',')}%`;

//         // Alinha o texto
//         ctx.textAlign = isLeftSide ? 'left' : 'right';
  
//         // Nome da fatia
//         ctx.fillText(label, labelX, labelY - 10);
  
//         // Percentual
//         ctx.fillText(percentage, labelX, labelY + 10);
//       });
//     },
//   };

//   const plugins = [
//     textCenter,
//     ...(drawLabels ? [drawLabelsPlugin] : []),
//   ];

//   return (
//     <div>
//       <Doughnut 
//         data={doughnutData} 
//         options={doughnutConfig} 
//         ref={chartRef} 
//         plugins={plugins}
//         style={style}
//       />
//     </div>
//   );
// }

import { useEffect, useRef, useMemo  } from 'react';
import {
  Chart,
  ArcElement,
  TooltipItem,
  TooltipModel,
  registerables,
  ChartConfiguration,
} from 'chart.js';
import { Box } from '@chakra-ui/react';
import { useToken } from "@chakra-ui/react";

Chart.register(...registerables);

type DoughnutChartProps = {
  totalValue?: number;
  style?: React.CSSProperties;
  data: { label: string; value: number }[];
  chartColors: string[]
  label: string
  drawLabels: boolean
  dataUnit: 'formula' | 'money'
};

export default function DoughnutChart(props: DoughnutChartProps) {
  const { totalValue, style, data, chartColors, label, drawLabels, dataUnit } = props;
  
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const [textCenterColor] = useToken("colors.doughnutChartColors", ["textCenter"]);
  const [lineColor] = useToken("colors.doughnutChartColors", ["line"]);
  const [pointColor] = useToken("colors.doughnutChartColors", ["point"]);
  const [sliceNameColor] = useToken("colors.doughnutChartColors", ["slice_name"]);
  const [percentageColor] = useToken("colors.doughnutChartColors", ["percentage"]);
  const [tooltipBackgroundColor] = useToken("colors.doughnutChartColors", ["tooltip_background"]);
  const [tooltipBodyColor] = useToken("colors.doughnutChartColors", ["tooltip_body"]);
  const [tooltipShadowColor] = useToken("colors.doughnutChartColors", ["tooltip_shadow"]);

  const doughnutData = useMemo(() => ({
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: chartColors,
        borderWidth: 0
      },
    ],
  }), [chartColors, label, labels, values]);

  const textCenter = useMemo(() => ({
    id: 'textCenter',
    beforeDraw(chart: Chart) {
      const { width } = chart;
      const { ctx } = chart;

      let text = '';
      
      if (totalValue && dataUnit === 'money' && drawLabels === false ) {
        text = `R$ ${totalValue.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }
      
      const fontSize = width === 130 ? '10px' : '16px';

      ctx.save();
      ctx.font = `${fontSize} GalanoGrotesqueMedium`;
      ctx.lineWidth = 400
      ctx.fillStyle = textCenterColor; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      // Calcula o centro do gráfico
      const centerX = width / 2;
      const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
  
      ctx.fillText(text, centerX, centerY);
      ctx.restore();
    },
  }), [dataUnit, drawLabels, textCenterColor, totalValue]);

  const drawLabelsPlugin = useMemo(() => ({
    id: 'doughnutLabels',
    afterDraw(chart: Chart) {
      const { ctx, data } = chart;

      if (!ctx || !data) return;
  
      // Configurações para o texto e linha
      const lineWidth = 1;
      const pointSize = 3;
      const lineLength = 100;

      ctx.textBaseline = 'middle';
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
  
      // Pega as coordenadas de cada fatia
      chart.getDatasetMeta(0).data.forEach((element, index) => {
        const arc = element as ArcElement; // Tipagem

        const angle = (arc.startAngle + arc.endAngle) / 2;
  
        const offset = -10; // Ajuste para aproximar a bolinha
        const x2 = arc.x + Math.cos(angle) * (arc.outerRadius + offset); 
        const y2 = arc.y + Math.sin(angle) * (arc.outerRadius + offset);
        
        // Determina o lado (direita ou esquerda)
        const isLeftSide = Math.cos(angle) < 0;
      
        const labelX = isLeftSide ? x2 - lineLength : x2 + lineLength; // Posição do texto (ajusta horizontalmente)
        const labelY = y2;
  
        // Desenha a linha
        ctx.beginPath();
        ctx.lineTo(x2, y2);
        ctx.lineTo(labelX, labelY);
        ctx.stroke();
        
        // Desenha o ponto na extremidade
        ctx.beginPath();
        ctx.fillStyle = pointColor;
        ctx.arc(x2, y2, pointSize, 0, 2 * Math.PI);
        ctx.fill();
        
        // Rótulos de texto
        const labels = data.labels as string[];
        const label = labels[index];

        // Obtém os dados do gráfico
        const dataset = data.datasets[0].data
        
        // Filtra apenas os valores numéricos
        const numericData = dataset.filter((val): val is number => typeof val === 'number');

        // Calcula o total
        const total = numericData.reduce((acc, val) => acc + val, 0);

        // Calcula a porcentagem
        const percentage = `${((data.datasets[0].data[index] as number / total) * 100).toFixed(2).replace('.', ',')}%`;

        // Alinha o texto
        ctx.textAlign = isLeftSide ? 'left' : 'right';
  
        // Nome da fatia
        ctx.font = '400 10px GalanoGrotesqueMedium';
        ctx.fillStyle = sliceNameColor;
        ctx.fillText(label, labelX, labelY - 10);
  
        // Percentual
        ctx.font = '400 9px GalanoGrotesqueAltRegular';
        ctx.fillStyle = percentageColor;
        ctx.fillText(percentage, labelX, labelY + 10);
      });
    },
  }), [lineColor, percentageColor, pointColor, sliceNameColor]);

  const config: ChartConfiguration = useMemo(() => ({
    type: "doughnut",
    data: doughnutData,
    options: {
      responsive: true,
      maintainAspectRatio: drawLabels ? false : true,
      layout: {
        padding: {
          top: drawLabels ? 20 : 0,
          bottom: drawLabels ? 20 : 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        }, 
        tooltip: {
          enabled: false, // Desabilita o tooltip padrão do Chart.js
          external: function(context: { chart: Chart; tooltip: TooltipModel<"doughnut"> }) {
            if (drawLabels) {
              // Se drawLabels for true, não exibe o tooltip
              return;
            }

            const { chart, tooltip } = context; 
            
            // Retorna se o tooltip não estiver visível
            if (!tooltip || tooltip.opacity === 0) {
              const tooltipEl = document.getElementById('chart-tooltip');
              const triangleEl = document.getElementById('chart-tooltip-triangle');
              if (triangleEl) triangleEl.style.opacity = '0';
              if (tooltipEl) tooltipEl.style.opacity = '0';
              return;
            }
    
            // Obtém ou cria o elemento HTML do tooltip
            let tooltipEl = document.getElementById('chart-tooltip');
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chart-tooltip';
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.pointerEvents = 'none';
              tooltipEl.style.backgroundColor = tooltipBackgroundColor;
              tooltipEl.style.borderRadius = '5px';
              tooltipEl.style.boxShadow = `0px 0px 10px ${tooltipShadowColor}`;
              tooltipEl.style.padding = '10px';
              tooltipEl.style.opacity = '0';
              tooltipEl.style.zIndex = '1000';
              tooltipEl.style.transition = 'left 0.3s ease, top 0.3s ease, opacity 0.3s ease';
              document.body.appendChild(tooltipEl);
            }
            
            // Configura o conteúdo do tooltip
            const label = tooltip.body[0].lines[0];
            tooltipEl.innerHTML = `
              <div style="font-family: PoppinsRegular">
                <div style="font-size: 18px; font-weight: 600; color: ${tooltipBodyColor}; text-align: center;">${label}</div>
              </div>
            `;
    
            // Posição do tooltip
            const position = chart.canvas.getBoundingClientRect();
            // const tooltipWidth = tooltipEl.offsetWidth;
            const tooltipHeight = tooltipEl.offsetHeight;
    
            // Posiciona o tooltip acima do ponto
            // tooltipEl.style.left = `${position.left + tooltip.caretX - tooltipWidth / 2}px`; // Centralizado horizontalmente
            // tooltipEl.style.top = `${position.top + tooltip.caretY - tooltipHeight / 0.8}px`; // Distância do tooltip em relação ao ponto
            
            // Posiciona o tooltip à direita do ponto
            tooltipEl.style.left = `${position.left + tooltip.caretX + 10}px`;
            tooltipEl.style.top = `${position.top + tooltip.caretY - tooltipHeight / 2}px`;
            tooltipEl.style.opacity = '1';
            
            // Desenha o triângulo
            let triangleEl = document.getElementById('chart-tooltip-triangle');
            if (!triangleEl) {
              triangleEl = document.createElement('div');
              triangleEl.id = 'chart-tooltip-triangle';
              triangleEl.style.position = 'absolute';
              triangleEl.style.width = '0';
              triangleEl.style.height = '0';
              triangleEl.style.borderLeft = '10px solid transparent';
              triangleEl.style.borderRight = '10px solid transparent';
              triangleEl.style.borderTop = `10px solid #FFF`;
              triangleEl.style.zIndex = '1000';
              triangleEl.style.transform = 'rotate(90deg)';
              triangleEl.style.pointerEvents = 'none';
              triangleEl.style.transition = 'left 0.3s ease, top 0.3s ease, opacity 0.3s ease';
              document.body.appendChild(triangleEl);
            }
            // Posiciona o triângulo em cima do ponto
            // triangleEl.style.left = `${position.left + tooltip.caretX - 10}px`;
            // triangleEl.style.top = `${position.top + tooltip.caretY - 19}px`;
            
            // Posiciona o triângulo à direita do ponto
            triangleEl.style.left = `${position.left + tooltip.caretX - 4}px`;
            triangleEl.style.top = `${position.top + tooltip.caretY - 5}px`;
            
            triangleEl.style.opacity = '1';
          }, 
          callbacks: {
            title: function () {
              return '';
            },
            label: function (tooltipItem: TooltipItem<'doughnut'>) {  
              const value = tooltipItem.raw as number;          
              if (dataUnit === 'money') {
                return [`R$ ${value.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`];
              } else if (dataUnit === 'formula') {
                // Obtém os dados do gráfico
                const data = tooltipItem.dataset.data

                // Calcula o total
                const total = data.reduce((acc, val) => acc + val, 0);

                // Calcula a porcentagem
                const percentage = ((value / total) * 100).toFixed(2).replace('.', ',');

                return [`${tooltipItem.label} ${percentage}%`];
              }
            },
          },
        },
      },
    },
    plugins: [
      textCenter,
      ...(drawLabels ? [drawLabelsPlugin] : []),
    ]
  }), [
    dataUnit, 
    doughnutData, 
    drawLabels, 
    drawLabelsPlugin, 
    textCenter, 
    tooltipBackgroundColor, 
    tooltipBodyColor, 
    tooltipShadowColor
  ]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, config);
      return () => {
        chart.destroy();
      };
    }
  }, [config]);

  return (
    <Box>
      <canvas ref={chartRef} style={style}></canvas>
    </Box>
  );
}

// Exemplo de uso
{/* 
  <DoughnutChart 
    totalValue={10000} 
    style={{ width: "100%", height: "100%" }}
    label="Dataset 1" 
    drawLabels={false}
    dataUnit={"money"}
    data={[
      { label: 'Teste', value: 10 },
      { label: 'Teste2', value: 20 },
      { label: 'Teste3', value: 30 },
      { label: 'Teste4', value: 25 },
      { label: 'Teste5', value: 15 }
    ]}
    chartColors={[
      'rgba(255, 99, 132, 0.5)', 
      'rgba(255, 159, 64, 0.5)', 
      'rgba(255, 205, 86, 0.5)', 
      'rgba(75, 192, 192, 0.5)', 
      'rgba(54, 162, 235, 0.5)' 
    ]}
  /> 
*/}



// import { useRef } from 'react';
// import { Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title,
// } from 'chart.js';
// import { Box } from '@chakra-ui/react';

// ChartJS.register(ArcElement, Tooltip, Legend, Title);

// type DoughnutChartProps = {
//   valorTotal?: number;
//   style?: React.CSSProperties;
//   data: { label: string; value: number }[];
//   chartColors: { label: string, value: string }[]
//   label: string
//   drawLabels: boolean
// };

// export default function DoughnutChart(props: DoughnutChartProps) {
//   const { valorTotal, style, data, chartColors, label, drawLabels } = props;
  
//   const chartRef = useRef<ChartJS<"doughnut">>(null);

//   const labels = data.map(item => item.label);
//   const values = data.map(item => item.value);

//   const chartColorsArray = chartColors.map(item => item.value)

//   const doughnutConfig = {
//     responsive: true,
//     maintainAspectRatio: drawLabels ? false : true,
//     layout: {
//       padding: {
//         top: drawLabels ? 20 : 0,
//         bottom: drawLabels ? 20 : 0,
//       },
//     },
//     plugins: {
//       legend: {
//         display: false,
//       }, 
//       tooltip: {
//         enabled: false, // Desativa o tooltip
//       },
//     },
//   };

//   const doughnutData = {
//     labels,
//     datasets: [
//       {
//         label,
//         data: values,
//         backgroundColor: chartColorsArray,
//         borderWidth: 0
//       },
//     ],
//   };

//   const textCenter = {
//     id: 'textCenter',
//     beforeDraw(chart: any) {
//       const { width } = chart;
//       const { ctx } = chart;

//       let text = '';
      
//       if (valorTotal) {
//         text = `R$ ${valorTotal.toLocaleString('pt-BR', {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         })}`;
//       }
      
//       const fontSize = width === 130 ? '10px' : '16px';

//       ctx.save();
//       ctx.font = `bold ${fontSize} Arial`; //Ajustar fonte com o projeto
//       ctx.fillStyle = 'black'; 
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
  
//       // Calcula o centro do gráfico
//       const centerX = width / 2;
//       const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
  
//       ctx.fillText(text, centerX, centerY);
//       ctx.restore();
//     },
//   };

//   const drawLabelsPlugin = {
//     id: 'doughnutLabels',
//     afterDraw(chart: ChartJS) {
//       const { ctx, data } = chart;

//       if (!ctx || !data) return;
  
//       // Configurações para o texto e linha
//       const fontSize = 12;
//       const lineWidth = 1;
//       const pointSize = 3;
//       const lineLength = 100;

//       ctx.font = `${fontSize}px Arial`;
//       ctx.textBaseline = 'middle';
//       ctx.fillStyle = 'black';
//       ctx.lineWidth = lineWidth;
//       ctx.strokeStyle = 'black';
  
//       // Pega as coordenadas de cada fatia
//       chart.getDatasetMeta(0).data.forEach((element, index) => {
//         const arc = element as ArcElement; // Tipagem

//         const angle = (arc.startAngle + arc.endAngle) / 2;
  
//         const offset = -10; // Ajuste para aproximar a bolinha
//         const x2 = arc.x + Math.cos(angle) * (arc.outerRadius + offset); 
//         const y2 = arc.y + Math.sin(angle) * (arc.outerRadius + offset);
        
//         // Determina o lado (direita ou esquerda)
//         const isLeftSide = Math.cos(angle) < 0;
      
//         const labelX = isLeftSide ? x2 - lineLength : x2 + lineLength; // Posição do texto (ajusta horizontalmente)
//         const labelY = y2;
  
//         // Desenha a linha
//         ctx.beginPath();
//         ctx.lineTo(x2, y2);
//         ctx.lineTo(labelX, labelY);
//         ctx.stroke();
  
//         // Desenha o ponto na extremidade
//         ctx.beginPath();
//         ctx.arc(x2, y2, pointSize, 0, 2 * Math.PI);
//         ctx.fill();
  
//         // Rótulos de texto
//         const labels = data.labels as string[];
//         const label = labels[index];
//         const percentage = `${(data.datasets[0].data[index] as number).toFixed(1).replace('.', ',')}%`;

//         // Alinha o texto
//         ctx.textAlign = isLeftSide ? 'left' : 'right';
  
//         // Nome da fatia
//         ctx.fillText(label, labelX, labelY - 10);
  
//         // Percentual
//         ctx.fillText(percentage, labelX, labelY + 10);
//       });
//     },
//   };

//   const plugins = [
//     textCenter,
//     ...(drawLabels ? [drawLabelsPlugin] : []),
//   ];

//   return (
//     <Box>
//       <Doughnut 
//         data={doughnutData} 
//         options={doughnutConfig} 
//         ref={chartRef} 
//         plugins={plugins}
//         style={style}
//       />
//     </Box>
//   );
// }

// Exemplo de uso
{/* 
  <DoughnutChart 
    valorTotal={10000} 
    style={{ width: "240px", height: "100%" }}
    label="Dataset 1" 
    drawLabels= {false}
    data={[
      { label: 'Teste', value: 10 },
      { label: 'Teste2', value: 20 },
      { label: 'Teste3', value: 30 },
      { label: 'Teste4', value: 25 },
      { label: 'Teste5', value: 15 }
    ]}
    chartColors={[
      { label: 'red', value: 'rgba(255, 99, 132, 0.5)' },
      { label: 'orange', value: 'rgba(255, 159, 64, 0.5)' },
      { label: 'yellow', value: 'rgba(255, 205, 86, 0.5)' },
      { label: 'green', value: 'rgba(75, 192, 192, 0.5)' },
      { label: 'blue', value: 'rgba(54, 162, 235, 0.5)' }
    ]}
  /> 
*/}
