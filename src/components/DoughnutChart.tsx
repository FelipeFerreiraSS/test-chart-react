import { useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CHART_COLORS = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)'
};

type DoughnutChartProps = {
  valorTotal?: number;
  style?: React.CSSProperties;
  data: { label: string; value: number }[];
  chartColors: { label: string, value: string }[]
  label: string
  drawLabels: boolean
};

export default function DoughnutChart(props: DoughnutChartProps) {
  const { valorTotal, style, data, chartColors, label, drawLabels } = props;
  
  const chartRef = useRef<ChartJS<"doughnut">>(null);

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const chartColorsArray = chartColors
    ? chartColors.map(item => item.value) // Usando as cores personalizadas passadas como parâmetro
    : Object.values(CHART_COLORS); // Se não for passado, usa as cores padrão

  const doughnutConfig = {
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
        enabled: false, // Desativa o tooltip
      },
    },
  };

  const doughnutData = {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor: chartColorsArray,
        borderWidth: 0
      },
    ],
  };

  const textCenter = {
    id: 'textCenter',
    beforeDraw(chart: any) {
      const { width } = chart;
      const { ctx } = chart;

      let text = '';
      
      if (valorTotal) {
        text = `R$ ${valorTotal.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }
      
      const fontSize = width === 130 ? '10px' : '16px';

      ctx.save();
      ctx.font = `bold ${fontSize} Arial`; //Ajustar fonte com o projeto
      ctx.fillStyle = 'black'; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      // Calcula o centro do gráfico
      const centerX = width / 2;
      const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
  
      ctx.fillText(text, centerX, centerY);
      ctx.restore();
    },
  };

  const drawLabelsPlugin = {
    id: 'doughnutLabels',
    afterDraw(chart: ChartJS) {
      const { ctx, chartArea, data } = chart;

      if (!ctx || !data) return;
  
      // Configurações para o texto e linha
      const fontSize = 12;
      const lineWidth = 1;
      const pointSize = 3;
      const lineLength = 100;

      ctx.font = `${fontSize}px Arial`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = 'black';
  
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
        ctx.arc(x2, y2, pointSize, 0, 2 * Math.PI);
        ctx.fill();
  
        // Rótulos de texto
        const labels = data.labels as string[];
        const label = labels[index];
        const percentage = `${(data.datasets[0].data[index] as number).toFixed(1).replace('.', ',')}%`;

        // Alinha o texto
        ctx.textAlign = isLeftSide ? 'left' : 'right';
  
        // Nome da fatia
        ctx.fillText(label, labelX, labelY - 10);
  
        // Percentual
        ctx.fillText(percentage, labelX, labelY + 10);
      });
    },
  };

  const plugins = [
    textCenter,
    ...(drawLabels ? [drawLabelsPlugin] : []),
  ];

  return (
    <div>
      <Doughnut 
        data={doughnutData} 
        options={doughnutConfig} 
        ref={chartRef} 
        plugins={plugins}
        style={style}
      />
    </div>
  );
}


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
