import MyRequestsPage from "@/components/students/myrequest";
import DashboardLayout from "@/components/shared/layout";
export default function myrequest() {
   return (
      <DashboardLayout userRole="student" userName="Rahul Sharma" userEmail="rahul.sharma@example.com" hostelInfo="Krishna Hostel" roomInfo="Room A-204">
         <MyRequestsPage />
      </DashboardLayout>
   )
}