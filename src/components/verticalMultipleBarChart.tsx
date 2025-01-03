import { useEffect, useRef } from "react";
import { Chart, ChartOptions, ChartData, registerables, ChartConfiguration, Plugin } from "chart.js";

Chart.register(...registerables);

interface VerticalMultipleBarChartProps {
  style?: React.CSSProperties;
  dataset1: {
    data: number[]
    label: string
    backgroundColor: string
  }
  dataset2: {
    data: number[]
    label: string
    backgroundColor: string
  }
}

export default function VerticalMultipleBarChart(props: VerticalMultipleBarChartProps) {
  const { style, dataset1, dataset2 } = props
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const data: ChartData = {
    labels,
    datasets: [
      {
        label: dataset1.label,
        data: dataset1.data,
        backgroundColor: dataset1.backgroundColor,
        borderRadius: 10,
        borderSkipped: false,
      },
      {
        label: dataset2.label,
        data: dataset2.data,
        backgroundColor: dataset2.backgroundColor,
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions = {
    scales: {
      x: {
        ticks: {
          callback: function (value, index) {
            const month = labels[index];
            const consumption = "Kg/Consumo";
            return [month, consumption];
          },
          font: {
            size: 12,
            lineHeight: 1.5,
          },
          padding: 15,
        },
        grid: {
          display: false,
        },
        border: {
          display: false
        }
      },
      y: {
        ticks: {
          stepSize: 1,
          callback: function (value) {
            const allowedTicks = [10, 20, 30, 40, 50];
            return allowedTicks.includes(Number(value)) ? `${value}Kg` : null;
          },
          padding: 15,
        },
        beginAtZero: false,
        min: 5,
        max: 50,
        grid: {
          tickLength: 0,
        },
        border: {
          display: false
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
            return [`R$ ${tooltipItem.raw}`];
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
  }

  const config: ChartConfiguration = {
    type: "bar",
    data: data,
    options
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: 'flex-end', marginRight: 10 }}>
        {data.datasets.map((dataset, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: dataset.backgroundColor?.toString(),
                marginRight: 10,
                borderRadius: 2
              }}
            ></div>
            <span>{dataset.label}</span>
          </div>
        ))}
      </div>
      <canvas ref={chartRef} style={style}></canvas>
    </>
  )
}


// const customBeforeDrawPlugin: Plugin = {
  //   id: 'customBeforeDraw',
  //   beforeDraw: function (chart: Chart) {
  //     const ctx = chart.ctx;
  //     const xAxis = chart.scales['x'];

  //     if (xAxis && xAxis.ticks) {
  //       xAxis.ticks.forEach((tick, index) => {
  //         const label = tick.label as unknown as string[];
  //         const x = xAxis.getPixelForTick(index);
  //         const y = chart.height

  //         if (label && label.length === 2) {
  //           // Mês
  //           ctx.save();
  //           ctx.font = 'bold 12px Arial';
  //           ctx.textAlign = 'center';
  //           ctx.fillText(label[0], x, y);
  //           ctx.restore();

  //           // "Kg/Consumo"
  //           ctx.save();
  //           ctx.font = 'normal 12px Arial';
  //           ctx.textAlign = 'center';
  //           ctx.fillText(label[1], x, y);
  //           ctx.restore();
  //         }
  //       });
  //     }
  //   },
  // };

  // Chart.register(customBeforeDrawPlugin);