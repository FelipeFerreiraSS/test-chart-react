import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LineChartTeste from "@/components/lineChartTeste";
import DoughnutChartBase from "@/components/doughnutChartBase";
import DoughnutChartTextCenter from "@/components/doughnutChartTextCenter";
import DoughnutChartDetails from "@/components/doughnutChartDetails";
import VerticalBarChartTeste from "@/components/verticalBarChartTeste";
import VerticalMultipleBarChart from "@/components/verticalMultipleBarChart";
import HorizontalBarChartTeste from "@/components/horizontalBarChartTeste";
import HorizontalBarChart from "@/components/horizontalBarChart";
import DoughnutChart from "@/components/DoughnutChart";
import VerticalBarChart from "@/components/verticalBarChart";
import LineChart from "@/components/lineChart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inputs = {
  min: 10000, 
  max: 50000, 
  count: 12,
  decimals: 2,
};

const generateData = () => {
  // Começa com um valor aleatório dentro do intervalo
  let currentValue = Math.random() * (inputs.max - inputs.min) + inputs.min;

  return Array.from({ length: inputs.count }, () => {
    // Suavizar a variação do valor para não sair do intervalo
    const variation = (Math.random() - 0.5) * 15000; // A variação pode ser ajustada para controlar a suavidade
    currentValue = Math.min(Math.max(currentValue + variation, inputs.min), inputs.max); // Garantir que o valor fique dentro do intervalo
    return Number(currentValue.toFixed(inputs.decimals)); // Retornar o número com as casas decimais
  });
};

const inputs2 = {
  min: 10000, 
  max: 50000, 
  count: 31,
  decimals: 2,
};

const generateData2 = () => {
  // Começa com um valor aleatório dentro do intervalo
  let currentValue = Math.random() * (inputs2.max - inputs2.min) + inputs2.min;

  return Array.from({ length: inputs2.count }, () => {
    // Suavizar a variação do valor para não sair do intervalo
    const variation = (Math.random() - 0.5) * 10000; // A variação pode ser ajustada para controlar a suavidade
    currentValue = Math.min(Math.max(currentValue + variation, inputs2.min), inputs2.max); // Garantir que o valor fique dentro do intervalo
    return Number(currentValue.toFixed(inputs2.decimals)); // Retornar o número com as casas decimais
  });
};

export default function Home() {
  return (
    <> 
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        {/* <LineChart 
          style={{ height: "200px", width: "100%" }}
          ticks={[10000, 20000, 30000, 40000, 50000]}
          unitOfMeasure="K" 
          labels={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
          datasets={[
            {
              label: "Dataset 1",
              data: generateData(), // Outra função de geração de dados
              borderColor: "rgba(54, 162, 235, 1)",
              fill: false,
            },
            {
              label: "Dataset 2",
              data: generateData(), // Outra função de geração de dados
              borderColor: "rgba(255, 159, 64, 1)",
              fill: false,
            },
          ]}
        /> */}
        {/* <LineChart 
          style={{ height: "200px", width: "100%" }}
          ticks={[10000, 20000, 30000, 40000, 50000]}
          unitOfMeasure="K"
          labels={[
            "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", 
            "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", 
            "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", 
            "31"
          ]}
          showLegends={true}
          datasets={[
            {
              label: "Dataset 1",
              data: generateData2(), // Outra função de geração de dados
              borderColor: "rgba(54, 162, 235, 1)",
              fill: true,
            },
            {
              label: "Dataset 2",
              data: generateData2(), // Outra função de geração de dados
              borderColor: "rgb(112, 255, 64)",
              fill: false,
            },
            {
              label: "Dataset 3",
              data: generateData2(), // Outra função de geração de dados
              borderColor: "rgb(237, 71, 15)",
              fill: false,
            },
            {
              label: "Dataset 4",
              data: generateData2(), // Outra função de geração de dados
              borderColor: "rgb(226, 5, 255)",
              fill: false,
            },
            {
              label: "Dataset 5",
              data: generateData2(), // Outra função de geração de dados
              borderColor: "rgb(245, 249, 7)",
              fill: false,
            },
            {
              label: "Dataset 6",
              data: generateData2(), // Outra função de geração de dados
              borderColor: "rgba(255, 159, 64, 1)",
              fill: false,
            },
          ]}
        /> */}
        {/* <LineChartTeste /> */}
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
            'rgba(255, 99, 132, 0.5)', 
            'rgba(255, 159, 64, 0.5)', 
            'rgba(255, 205, 86, 0.5)', 
            'rgba(75, 192, 192, 0.5)', 
            'rgba(54, 162, 235, 0.5)' 
          ]}
        /> 
        {/* <DoughnutChart 
          valorTotal={10000} 
          style={{ height: "100%", width: "240px" }}
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
            'rgba(255, 99, 132, 0.5)', 
            'rgba(255, 159, 64, 0.5)', 
            'rgba(255, 205, 86, 0.5)', 
            'rgba(75, 192, 192, 0.5)', 
            'rgba(54, 162, 235, 0.5)' 
          ]}
        /> */}
        {/* <DoughnutChart 
          style={{ height: "280px", width: "700px" }}
          label="Dataset 1" 
          drawLabels= {true}
          data={[
            { label: 'Teste', value: 3 },
            { label: 'Teste2', value: 20 },
            { label: 'Teste3', value: 55 },
            { label: 'Teste4', value: 5 },
            { label: 'Teste5', value: 15 }
          ]}
          chartColors={[
            { label: 'red', value: 'rgba(255, 99, 132, 0.5)' },
            { label: 'orange', value: 'rgba(255, 159, 64, 0.5)' },
            { label: 'yellow', value: 'rgba(255, 205, 86, 0.5)' },
            { label: 'green', value: 'rgba(75, 192, 192, 0.5)' },
            { label: 'blue', value: 'rgba(54, 162, 235, 0.5)' }
          ]}
        /> */}
        {/* <div style={{display: 'flex', gap: '50px'}}>
          <div>
            <p>Doughnut Chart Base</p>
            <DoughnutChartBase />
          </div>
          <div>
            <p>Doughnut Chart Text Center</p>
            <DoughnutChartTextCenter />
          </div>
        </div> */}
        {/* <p>Doughnut Chart Details</p>
        <DoughnutChartDetails /> */}


        {/* <p>Horizontal Bar Chart </p>
        <HorizontalBarChart 
          data={[
            { "label": "PRÉ Oadsfasd", "value": 20000 },
            { "label": "PRÉ 1", "value": 30000 },
            { "label": "INICIAL", "value": 24000 },
            { "label": "CRESC 1", "value": 38000 },
            { "label": "CRESC 2", "value": 4000 },
            { "label": "TERM 1", "value": 32000 },
            { "label": "TERM 2", "value": 10000 }
          ]}
          gridColor='rgba(0, 0, 0, 0.1)'
          ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000]}
          label="Dataset 1"
          chartColor='rgba(54, 162, 235, 1)'
          style={{ height: '300px', width: '100%' }}
        /> */}


        {/* <p>Horizontal Bar Chart Teste</p>
        <HorizontalBarChartTeste 
          data={[
            { "label": "PRÉ Oadsfasd", "value": 20000 },
            { "label": "PRÉ 1", "value": 30000 },
            { "label": "INICIAL", "value": 24000 },
            { "label": "CRESC 1", "value": 38000 },
            { "label": "CRESC 2", "value": 4000 },
            { "label": "TERM 1", "value": 32000 },
            { "label": "TERM 2", "value": 10000 }
          ]}
          label="Dataset 1"
          chartColor='rgba(54, 162, 235, 1)'
          style={{ height: '300px', width: '100%' }}
        /> */}
        {/* <p>Vertical Bar Chart</p>
        <VerticalBarChart 
          style={{ height: "500px", width: "100%" }}
          labels={['PRÉ 1', 'PRÉ 2', 'INICIAL', 'CRESC 1', 'CRESC 2', 'TERM 1', 'TERM 2']}
          dataset={[1.2, 1.5, 1.6, 1.3, 1.9, 1.6, 1.4]}
          label='Dataset 1'
          chartColor="#33C1FF"
          ticks={[1.1, 1.3, 1.5, 1.7, 1.9]}
        /> */}
        {/* <p>Vertical Multiple Bar Chart</p>
        <VerticalMultipleBarChart 
          dataset1={{
            data: [10, 46, 17, 21, 39, 21, 34, 26, 46, 19, 25, 47],
            label: "Dataset 1",
            backgroundColor: "#33C1FF"
          }}
          dataset2={{
            data: [25, 32, 28, 40, 36, 18, 22, 27, 33, 44, 21, 30],
            label: "Dataset 2",
            backgroundColor: "#FF5733"
          }}
          style={{ height: "300px", width: "100%" }}
        /> */}
        {/* <p>Vertical Bar Chart Teste</p>
        <VerticalBarChartTeste /> */}
      </div>
    </>
  );
}
