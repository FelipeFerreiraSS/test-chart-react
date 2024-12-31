import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LineChart from "@/components/lineChart";
import DoughnutChartBase from "@/components/doughnutChartBase";
import DoughnutChartTextCenter from "@/components/doughnutChartTextCenter";
import DoughnutChartDetails from "@/components/doughnutChartDetails";
import VerticalBarChart from "@/components/verticalBarChart";
import HorizontalBarChart from "@/components/horizontalBarChart";
import DoughnutChart from "@/components/DoughnutChart";

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
        <DoughnutChart 
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
            { label: 'red', value: 'rgba(255, 99, 132, 0.5)' },
            { label: 'orange', value: 'rgba(255, 159, 64, 0.5)' },
            { label: 'yellow', value: 'rgba(255, 205, 86, 0.5)' },
            { label: 'green', value: 'rgba(75, 192, 192, 0.5)' },
            { label: 'blue', value: 'rgba(54, 162, 235, 0.5)' }
          ]}
        />
        <DoughnutChart 
          style={{ height: "280px", width: "700px" }}
          label="Dataset 1" 
          drawLabels= {true}
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
        <p>Doughnut Chart Details</p>
        <DoughnutChartDetails />
        {/* <p>Vertical Bar Chart</p>
        <VerticalBarChart />
        <p>Horizontal Bar Chart</p>
        <HorizontalBarChart /> */}
      </div>
    </>
  );
}
