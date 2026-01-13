import ActiveVisitorsPage from "@/components/warden/active_visitors";
import DashboardLayout from "@/components/shared/layout";
export default function ActiveVisitors() {
   return (
      <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
         <ActiveVisitorsPage />
      </DashboardLayout>
   )
}