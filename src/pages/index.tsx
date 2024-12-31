import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LineChart from "@/components/lineChart";
import DoughnutChartBase from "@/components/doughnutChartBase";
import DoughnutChartTextCenter from "@/components/doughnutChartTextCenter";
import DoughnutChartDetails from "@/components/doughnutChartDetails";
import VerticalBarChart from "@/components/verticalBarChart";
import HorizontalBarChart from "@/components/horizontalBarChart";

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
        <LineChart />
        <div style={{display: 'flex', gap: '50px'}}>
          <div>
            <p>Doughnut Chart Base</p>
            <DoughnutChartBase />
          </div>
          <div>
            <p>Doughnut Chart Text Center</p>
            <DoughnutChartTextCenter />
          </div>
        </div>
        <p>Doughnut Chart Details</p>
        <DoughnutChartDetails />
        <p>Vertical Bar Chart</p>
        <VerticalBarChart />
        <p>Horizontal Bar Chart</p>
        <HorizontalBarChart />
      </div>
    </>
  );
}
