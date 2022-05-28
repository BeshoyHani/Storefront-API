import { Order } from '../../models/order';
import { User } from '../../models/user';
import DashboardQueries from '../../services/dashboard';

describe('Order Model Testing', () => {
    let orderStore: Order, order_id: number, user_id: number;
    let dashboardStore: DashboardQueries;
    let userStore: User;
    let username: string;

    beforeAll(async () => {
        orderStore = new Order();
        dashboardStore = new DashboardQueries();
        userStore = new User();
        const user = await userStore.create({
            username: 'Besh',
            first_name: 'Beshoy',
            last_name: 'Hani',
            password: '123',
        });

        user_id = user.id as number;
        username = user.username;
    });

    afterAll(async () => {
        await userStore.delete(username);
    });

    it('Open Order', async () => {
        order_id = await orderStore.openOrder(user_id);
        expect(order_id).toBeGreaterThanOrEqual(1);
    });

    it('Get Products in Order', async () => {
        const products = await dashboardStore.productsInOrder(order_id);
        expect(products).toBeDefined();
    });
});
