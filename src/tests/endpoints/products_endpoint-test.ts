import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Endpoint Products Testing', () => {
    let token: string;
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

    it('Create New Product -- POST /products', async () => {
        const response = await request
            .post('/products')
            .set({ Authorization: 'Bearer ' + token })
            .send({
                name: 'Tecno W4',
                price: '1200',
                category: 'Mobile',
            });
        expect(response.statusCode).toBe(200);
    });

    it('Get Products -- Get /products', async () => {
        const response = await request.get('/products');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('Get Products -- Get /products/id', async () => {
        const response = await request.get('/products/1');
        expect(response.statusCode).toBe(200);
    });

    it("Can't Create New Product with Unauthorized Access -- POST /products", async () => {
        const response = await request.post('/products').send({
            name: 'Samsung Grand Prime',
            price: '2300',
            category: 'Mobile',
        });
        expect(response.statusCode).toBe(401);
    });

    it("Can't Create New Product with Missing Parameters -- POST /products", async () => {
        const response = await request
            .post('/products')
            .set({ Authorization: 'Bearer ' + token })
            .send({
                name: 'Samsung Grand Prime',
                pic: '2300',
                category: 'Mobile',
            });
        expect(response.statusCode).toBe(400);
    });
});
