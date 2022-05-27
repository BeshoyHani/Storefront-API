import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe("Endpoint Users Testing", () => {
    let token: string;
    it('Create new User', async () => {
        const response = await request.post('/users/create').send({
            username: "Besh",
            first_name: "Beshoy",
            last_name: "Hani",
            password: "123"
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.id).toEqual(1);
    });

    it('Signin User', async () => {
        const response = await request.post('/users/signin').send({
            username: "Besh",
            password: "123"
        });
        expect(response.statusCode).toEqual(200)
        expect(response.body.token).toBeDefined();
        token = response.body.token;
    });

    it('Get Users', async () => {
        const response = await request.get('/users').set({ Authorization: 'Bearer ' + token });
        expect(response.statusCode).toEqual(200);
        expect(response.body[0]).toBeDefined();
    });

    it('Get User with ID', async () => {
        const response = await request.get('/users/1').set({ Authorization: 'Bearer ' + token });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toBeDefined();
    });

    it('Get Users - Unauthorized Accesss', async () => {
        const response = await request.get('/users');
        expect(response.statusCode).toEqual(401);
    });

    it('Create new User With Missing Parameters', async () => {
        const response = await request.post('/users/create').send({
            username: "Besh",
            first_name: "Beshoy",
            password: "123"
        });
        expect(response.statusCode).toEqual(400);
    });
})