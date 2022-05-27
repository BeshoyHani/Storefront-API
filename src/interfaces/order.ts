export enum orderStatus {
    active = 'ACTIVE',
    pending = 'PENDING',
    in_progress = 'IN PROGRESS',
    completed = 'COMPLETED',
}

export function getOrderStatus(status_name: string): orderStatus {
    const status = status_name.toLowerCase();
    switch (status) {
        case 'active':
            return orderStatus.active;
        case 'pending':
            return orderStatus.pending;
        case 'in progress':
            return orderStatus.in_progress;
        case 'completed':
            return orderStatus.completed;
        default:
            throw Error('Invalid status');
    }
}

export default interface IOrder {
    id: number;
    user_id: number;
    products_ids: number[];
    status: orderStatus;
}
