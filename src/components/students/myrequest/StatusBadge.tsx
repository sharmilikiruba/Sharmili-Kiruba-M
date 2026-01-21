import { Request } from './types';

interface StatusBadgeProps {
    status: Request['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const colors = {
        Pending: 'bg-yellow-500',
        Approved: 'bg-green-600',
        Rejected: 'bg-red-600',
    };

    return (
        <span className={`${colors[status]} text-white px-3 py-1 rounded-full text-xs`}>
            {status}
        </span>
    );
}
