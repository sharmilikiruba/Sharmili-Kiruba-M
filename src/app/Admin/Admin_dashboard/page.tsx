import AdminDashboard from "@/components/admin/admin_dashboard";
import DashboardLayout from "@/components/shared/layout";

export default function AdminDashboardPage() {
  return (
    <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
      <AdminDashboard />
    </DashboardLayout>
  )
}   