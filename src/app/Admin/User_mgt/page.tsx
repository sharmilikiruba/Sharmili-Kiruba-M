import DashboardLayout from "@/components/shared/layout";
import UserManagement from "@/components/admin/user_management";

export default function UserMgtPage() {
  return (
    <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
      <UserManagement/>
    </DashboardLayout>
  )
}   