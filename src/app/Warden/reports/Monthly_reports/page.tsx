import DashboardLayout from "@/components/shared/layout";
import MonthlyStatisticsReport from "@/components/warden/warden_report/monthly_statistics";

export default function MonthlyReport() {
   return(
     <DashboardLayout>
       <MonthlyStatisticsReport />
     </DashboardLayout>
   )
}