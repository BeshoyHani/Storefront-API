export enum orderStatus{
    active = "ACTIVE",
    completed = "COMPLETED"
}

export default interface IOrder {
    id: number,
    user_id: number,
    status: orderStatus
}