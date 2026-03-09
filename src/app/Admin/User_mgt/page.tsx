import DashboardLayout from "@/components/shared/layout";
import UserManagement from "@/components/admin/users/UserManagement";

export default function UserMgtPage() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  )
}   