import AdminProfile from "@/components/admin/admin_profile";
import DashboardLayout from "@/components/shared/layout";

export default function AdminProfilePage() {
  return (
    <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
      <AdminProfile />
    </DashboardLayout>
  )
}   