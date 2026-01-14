import BlacklistManagement from "@/components/warden/blacklist_mgt";
import DashboardLayout from "@/components/shared/layout";
export default function BlacklistManagementPage() {
   return (
      <DashboardLayout userRole="warden" userName="Vikram Singh" userEmail="vikram.warden@example.com" hostelInfo="Krishna Hostel">
         <BlacklistManagement />
      </DashboardLayout>
   )
}