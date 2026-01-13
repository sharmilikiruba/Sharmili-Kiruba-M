import DashboardLayout from "@/components/shared/layout";
import SystemConfiguration from "@/components/admin/system_config";

export default function SystemConfigurationPage() {
  return (
    <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
      <SystemConfiguration/>
    </DashboardLayout>
  )
}   