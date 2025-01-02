import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LineChart from "@/components/lineChart";
import DoughnutChartBase from "@/components/doughnutChartBase";
import DoughnutChartTextCenter from "@/components/doughnutChartTextCenter";
import DoughnutChartDetails from "@/components/doughnutChartDetails";
import VerticalBarChartTeste from "@/components/verticalBarChartTeste";
import VerticalMultipleBarChart from "@/components/verticalMultipleBarChart";
import HorizontalBarChartTeste from "@/components/horizontalBarChartTeste";
import HorizontalBarChart from "@/components/horizontalBarChart";
import DoughnutChart from "@/components/DoughnutChart";
import VerticalBarChart from "@/components/verticalBarChart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function Home() {
  return (
    <> 
      <div className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        {/* <LineChart /> */}
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


        <p>Horizontal Bar Chart </p>
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
        />


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
        <p>Vertical Bar Chart</p>
        <VerticalBarChart 
          style={{ height: "500px", width: "100%" }}
          labels={['PRÉ 1', 'PRÉ 2', 'INICIAL', 'CRESC 1', 'CRESC 2', 'TERM 1', 'TERM 2']}
          dataset={[1.2, 1.5, 1.6, 1.3, 1.9, 1.6, 1.4]}
          label='Dataset 1'
          chartColor="#33C1FF"
          ticks={[1.1, 1.3, 1.5, 1.7, 1.9]}
        />
        <p>Vertical Multiple Bar Chart</p>
        <VerticalMultipleBarChart 
          style={{ height: "300px", width: "100%" }}
        />
        <p>Vertical Bar Chart Teste</p>
        <VerticalBarChartTeste />
      </div>
    </>
  );
}
