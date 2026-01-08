import DashboardLayout from "@/components/shared/layout";
import  StudentWiseHistory from "@/components/warden/warden_report/studentwise_report";

export default function studentwise_report() {
   return(
     <DashboardLayout>
       <StudentWiseHistory />
     </DashboardLayout>
   )
}