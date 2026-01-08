import DashboardLayout from "@/components/shared/layout";
import EmergencyVisitLog from "@/components/warden/warden_report/emergency_log";

export default function EmergencyVisitLogPage() {
   return(
     <DashboardLayout>
       <EmergencyVisitLog />
     </DashboardLayout>
   )
}