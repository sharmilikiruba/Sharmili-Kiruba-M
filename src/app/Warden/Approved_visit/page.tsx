import ApprovedVisitsPage from "@/components/warden/approved_visits";
import DashboardLayout from "@/components/shared/layout";
export default function ApprovedVisits() {
   return (
      <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
         <ApprovedVisitsPage />
      </DashboardLayout>
   )
}