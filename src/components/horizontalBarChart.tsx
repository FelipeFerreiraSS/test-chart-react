import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChartOptions, ChartData } from 'chart.js';

Chart.register(...registerables);

interface HorizontalBarChartProps {
  label: string
  data: { label: string; value: number }[];
  style?: React.CSSProperties;
  chartColor: string 
  ticks: number[];
  gridColor: string
}

export default function HorizontalBarChart(props: HorizontalBarChartProps) {
  const { label, data, style, chartColor, ticks, gridColor } = props
  const chartRef = useRef<HTMLCanvasElement>(null);

  const labels = data.map(item => item.label);
  const values = data.map(item => item.value);

  const maxTickValue = Math.max(...ticks);

  useEffect(() => {
    if (chartRef.current) {
      const data: ChartData = {
        labels: labels,
        datasets: [
          {
            label,
            data: values,
            backgroundColor: chartColor,
            borderRadius: 5,
          },
        ],
      };

      const options: ChartOptions = {
        indexAxis: 'y',
        scales: {
          y: {
            grid: {
              display: false,
            },
            ticks: {
              padding: 20,
            },
          },
          x: {
            ticks: {
              callback: function (value) {
                return ticks.includes(Number(value)) ? value.toString() : '';
              },
              padding: 20
            },
            beginAtZero: true,
            min: 0,
            max: maxTickValue,
            grid: {
              drawOnChartArea: true,
              color: gridColor,
              tickLength: 0,
            },
            // adiciona linhas intermediárias
            afterBuildTicks: (axis) => {
              const ticks = axis.ticks; // Pega os ticks principais
              const newTicks = [];
              for (let i = 0; i < ticks.length - 1; i++) {
                newTicks.push(ticks[i]);
                const midpoint = (ticks[i].value + ticks[i + 1].value) / 2;
                newTicks.push({ value: midpoint }); // Adiciona ticks intermediários
              }
              // Certifica-se de que o último valor (maxTickValue) seja incluído
              if (newTicks[newTicks.length - 1].value !== maxTickValue) {
                newTicks.push({ value: maxTickValue });
              }
              axis.ticks = newTicks; // Atualiza os ticks
            },
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
                return [`R$ ${tooltipItem.raw}`];
              },
            },
            bodyFont: {
              weight: 'bold',
              size: 15,
            },
            displayColors: false,
          },
        },
      };

      new Chart(chartRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
    }
  }, []);

  return (
    <>
      <canvas ref={chartRef} style={style}></canvas>
    </>
  );
}
