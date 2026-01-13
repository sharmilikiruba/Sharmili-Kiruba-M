import DashboardLayout from "@/components/shared/layout";
import AuditLogs from "@/components/admin/audit_logs";

export default function AuditLogsPage() {
    return (
        <DashboardLayout userRole="admin" userName="Ram Kumar" userEmail="ram.admin@example.com" hostelInfo="Main Gate">
            <AuditLogs />
        </DashboardLayout>
    )
}   