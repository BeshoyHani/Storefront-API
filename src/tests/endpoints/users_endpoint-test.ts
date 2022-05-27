import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Endpoint Users Testing', () => {
    let token: string;

    afterAll(async () => {
        await request.post('/users/delete').send({ username: 'besh' });
    });

    it('Create new User -- POST /users/create', async () => {
        const response = await request.post('/users/create').send({
            username: 'Besh',
            first_name: 'Beshoy',
            last_name: 'Hani',
            password: '123',
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.id).not.toBeNaN();
    });

    it('Signin User -- POST /users/signin', async () => {
        const response = await request.post('/users/signin').send({
            username: 'Besh',
            password: '123',
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });

    it('Get Users GET /users', async () => {
        const response = await request
            .get('/users')
            .set({ Authorization: 'Bearer ' + token });
        expect(response.statusCode).toEqual(200);
        expect(response.body[0]).toBeDefined();
    });

    it('Get User with ID -- GET /users/id', async () => {
        const response = await request
            .get('/users/1')
            .set({ Authorization: 'Bearer ' + token });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it("Can't Get Users - Unauthorized Accesss -- GET /users", async () => {
        const response = await request.get('/users');
        expect(response.statusCode).toEqual(401);
    });

    it("Can't Create new User With Missing Parameters -- POST /users/create", async () => {
        const response = await request.post('/users/create').send({
            username: 'Besh',
            first_name: 'Beshoy',
            password: '123',
        });
        expect(response.statusCode).toEqual(400);
    });
});
