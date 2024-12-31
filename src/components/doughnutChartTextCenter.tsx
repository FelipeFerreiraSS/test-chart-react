import { useRef } from 'react';
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

// const actions = [
//   {
//     name: 'Randomize',
//     handler(chart: Chart) {
//       chart.data.datasets.forEach((dataset) => {
//         dataset.data = numbers({ count: chart.data.labels!.length, min: 0, max: 100 });
//       });
//       chart.update();
//     },
//   },
//   {
//     name: 'Add Dataset',
//     handler(chart: Chart) {
//       const data = chart.data;
//       const newDataset = {
//         label: 'Dataset ' + (data.datasets.length + 1),
//         backgroundColor: [],
//         data: [],
//       };

//       for (let i = 0; i < data.labels!.length; i++) {
//         newDataset.data.push(rand(0, 100));

//         const colorIndex = i % Object.keys(CHART_COLORS).length;
//         newDataset.backgroundColor.push(Object.values(CHART_COLORS)[colorIndex]);
//       }

//       chart.data.datasets.push(newDataset);
//       chart.update();
//     },
//   },
//   {
//     name: 'Add Data',
//     handler(chart: Chart) {
//       const data = chart.data;
//       if (data.datasets.length > 0) {
//         data.labels!.push('data #' + (data.labels!.length + 1));

//         for (let index = 0; index < data.datasets.length; ++index) {
//           data.datasets[index].data.push(rand(0, 100));
//         }

//         chart.update();
//       }
//     },
//   },
//   {
//     name: 'Remove Dataset',
//     handler(chart: Chart) {
//       chart.data.datasets.pop();
//       chart.update();
//     },
//   },
//   {
//     name: 'Remove Data',
//     handler(chart: Chart) {
//       chart.data.labels!.splice(-1, 1);

//       chart.data.datasets.forEach((dataset) => {
//         dataset.data.pop();
//       });

//       chart.update();
//     },
//   },
// ];

const valorTotal = 10000

const textCenter = {
  id: 'textCenter',
  beforeDraw(chart: any) {
    const { width } = chart;
    const { ctx } = chart;
    const text = `R$ ${valorTotal.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`; // Texto que será exibido

    ctx.save();
    ctx.font = 'bold 15px Arial';
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

export default function DoughnutChartTextCenter() {
  const chartRef = useRef<ChartJS>(null);

  const handleAction = (action: (chart: ChartJS) => void) => {
    if (chartRef.current) {
      action(chartRef.current);
    }
  };

  return (
    <div>
      <Doughnut 
        data={doughnutData} 
        options={doughnutConfig} 
        ref={chartRef} 
        style={{ height: "100px", width: "100%" }} 
        plugins={[textCenter]}
      />
      <div style={{ marginTop: '20px' }}>
        {/* {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleAction(action.handler)}
            style={{ marginRight: '10px' }}
          >
            {action.name}
          </button>
        ))} */}
      </div>
    </div>
  );
}
