import { useEffect, useRef } from 'react';
import { Chart, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
//import Utils from '@/utils/chartUtils'; 

ChartJS.register(ArcElement, Tooltip, Legend, Title);

// chartUtils

const CHART_COLORS = {
  red: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgba(255, 159, 64, 0.5)',
  yellow: 'rgba(255, 205, 86, 0.5)',
  green: 'rgba(75, 192, 192, 0.5)',
  blue: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgba(153, 102, 255, 0.5)',
  grey: 'rgba(201, 203, 207, 0.5)'
};

const numbers = ({ count, min, max }: { count: number; min: number; max: number }) => {
  const data: number[] = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
};

const rand = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// export default {
//   CHART_COLORS,
//   numbers,
//   rand,
// };

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const doughnutData = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: numbers(NUMBER_CFG),
      backgroundColor: Object.values(CHART_COLORS),
      borderWidth: 0
    },
  ],
};

const doughnutConfig = {
  responsive: true,
  maintainAspectRatio: false, // Permite que o gráfico seja distorcido para se ajustar ao contêiner
    
  // maintainAspectRatio: false, // Permite ajustar tamanho
  layout: {
    padding: {
      top: 20,    // Espaço extra acima do gráfico
      bottom: 20, // Espaço extra abaixo
    },
  },
  plugins: {
    legend: {
      //position: 'top' as const,
      display: false,
    }, 
    // title: {
    //   display: true,
    //   text: 'Chart.js Doughnut Chart',
    // },
    tooltip: {
      enabled: false, // Desativa o tooltip
    },
  },
};

const drawLabelsPlugin = {
  id: 'doughnutLabels',
  afterDraw(chart: ChartJS) {
    const { ctx, chartArea, data } = chart;

    // Configurações para o texto e linha
    const fontSize = 12;
    const lineWidth = 1;
    const pointSize = 3;
    const lineLength = 100;

    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'black';

    // Pega as coordenadas de cada fatia
    chart.getDatasetMeta(0).data.forEach((arc, index) => {
      const angle = (arc.startAngle + arc.endAngle) / 2;
      const x1 = arc.x + Math.cos(angle) * arc.outerRadius; // Ponto na borda da fatia
      const y1 = arc.y + Math.sin(angle) * arc.outerRadius;

      const offset = -10; // Ajuste para aproximar a bolinha (reduza este valor para aproximar ainda mais)
      const x2 = arc.x + Math.cos(angle) * (arc.outerRadius + offset); 
      const y2 = arc.y + Math.sin(angle) * (arc.outerRadius + offset);

      const labelX = x2 + (angle < Math.PI ? lineLength : -lineLength); // Posição do texto (ajusta horizontalmente)
      const labelY = y2;

      // Desenha a linha
      ctx.beginPath();
      // ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(labelX, labelY);
      ctx.stroke();

      // Desenha o ponto na extremidade
      ctx.beginPath();
      ctx.arc(x2, y2, pointSize, 0, 2 * Math.PI);
      ctx.fill();

      // Rótulos de texto
      const label = data.labels![index];
      const percentage = `${data.datasets[0].data[index]}%`;

      // Nome da fatia
      ctx.fillText(label, labelX, labelY - 10);

      // Percentual
      ctx.fillText(percentage, labelX, labelY + 10);
    });
  },
};

export default function DoughnutChartDetails() {
  const chartRef = useRef<ChartJS>(null);

  return (
    <div>
      <Doughnut 
        data={doughnutData} 
        options={doughnutConfig} 
        ref={chartRef} 
        style={{ height: "250px", width: "700px" }} 
        plugins={[drawLabelsPlugin]}
      />
    </div>
  );
}
