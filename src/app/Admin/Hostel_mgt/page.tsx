import DashboardLayout from "@/components/shared/layout";
import HostelManagement from "@/components/admin/hostel_management";

export default function HostelMgtPage() {
    return (
        <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
            <HostelManagement />
        </DashboardLayout>
    )
}   