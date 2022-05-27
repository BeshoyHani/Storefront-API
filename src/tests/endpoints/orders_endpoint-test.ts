import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Endpoint Orders Testing', () => {
    let token: string, order_id: number;
    beforeAll(async () => {
        await request.post('/users/create').send({
            username: 'test',
            first_name: 'test',
            last_name: 'test',
            password: '123',
        });
        const response = await request
            .post('/users/signin')
            .send({ username: 'test', password: '123' });
        token = response.body.token;
    });

    afterAll(async () => {
        await request.post('/users/delete').send({ username: 'test' });
    });

    it('open new order -- POST /orders/new', async () => {
        const response = await request
            .post('/orders/new')
            .set({ Authorization: 'Bearer ' + token });
        expect(response.statusCode).toBe(200);
        order_id = response.body.order_id;
    });

    it('Add product to order -- POST /orders/add_product', async () => {
        const response = await request
            .post('/orders/add_product')
            .set({ Authorization: 'Bearer ' + token })
            .send({
                productId: '1',
                orderId: order_id,
                quantity: '3',
            });
        expect(response.statusCode >= 400 && response.statusCode < 500)
            .toBeFalse; // Product Doesn't Exists but endpoint is reachable
    });

    it("Can't open new order - Unauthorized Access -- POST /orders/new", async () => {
        const response = await request.post('/orders/new');
        expect(response.statusCode).toBe(401);
    });
});
