import DashboardLayout from "@/components/shared/layout";
import PendingRequestsPage from "@/components/warden/pending_req";

export default function PendingRequestPage() {
   return(
     <DashboardLayout>
       <PendingRequestsPage />
     </DashboardLayout>
   )
}