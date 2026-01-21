import DashboardLayout from "@/components/shared/layout";
import SecurityManagement from "@/components/admin/security/SecurityManagement";

export default function SecurityManagementPage() {
  return (
    <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
      <SecurityManagement />
    </DashboardLayout>
  )
}   