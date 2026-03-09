import StudentDashboardPage from "@/components/students/dashboard";
import DashboardLayout from "@/components/shared/layout";

export default function StudDashboard() {
   return (
      <DashboardLayout>
         <StudentDashboardPage />
      </DashboardLayout>
   )
}