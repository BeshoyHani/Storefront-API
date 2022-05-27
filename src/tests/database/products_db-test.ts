import { Product } from '../../models/product';

describe('Product Model Testing', () => {
    let productStore: Product;

    beforeAll(() => {
        productStore = new Product();
    });

    it('Add Product', async () => {
        const product = await productStore.create({
            name: 'Lenovo Ideapad',
            price: 1000,
            category: 'Laptop',
        });
        expect(product.id).toEqual(1);
        expect(product.name).toEqual('Lenovo Ideapad');
    });

    it('Get All Products', async () => {
        const products = await productStore.index();
        expect(products).not.toBeNull();
        expect(products[0].id).toEqual(1);
    });

    it('Get Product With Specific ID', async () => {
        const product = await productStore.show(1);
        expect(product).not.toBeNull();
        expect(product.id).toEqual(1);
    });
});
