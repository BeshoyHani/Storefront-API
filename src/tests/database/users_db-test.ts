import { User } from '../../models/user';

describe('User Model Testing', () => {
    let userStore: User;

    beforeAll(() => {
        userStore = new User();
    });

    it('Create User', async () => {
        const user = await userStore.create({
            username: 'Besh',
            first_name: 'Beshoy',
            last_name: 'Hani',
            password: '123',
        });
        expect(user.username).toEqual('besh');
    });

    it('Get All Users', async () => {
        const users = await userStore.index();
        expect(users).not.toBeNull();
        expect(users[0].id).toEqual(1);
    });

    it('Get User with ID = 1', async () => {
        const user = await userStore.show(1);
        expect(user).not.toBeNull();
        expect(user.id).toEqual(1);
    });
});
