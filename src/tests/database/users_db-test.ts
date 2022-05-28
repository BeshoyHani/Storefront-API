import { User } from '../../models/user';

describe('User Model Testing', () => {
    let userStore: User, username: string;
    let user_id: number;

    beforeAll(() => {
        userStore = new User();
    });

    afterAll(async () => {
        await userStore.delete(username);
    });

    it('Create User', async () => {
        const user = await userStore.create({
            username: 'Besh',
            first_name: 'Beshoy',
            last_name: 'Hani',
            password: '123',
        });
        expect(user.username).toEqual('besh');
        username = user.username;
        user_id = user.id as number;
    });

    it('Get All Users', async () => {
        const users = await userStore.index();
        expect(users).not.toBeNull();
        expect(users[0].id).toBeGreaterThanOrEqual(1);
    });

    it(`Get User with Specific ID `, async () => {
        const user = await userStore.show(user_id);
        expect(user).not.toBeNull();
        expect(user.id).toEqual(user_id);
    });
});
