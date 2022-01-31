import { isEmpty } from 'lodash';

export type Product = {
    id: string;
    name: string;
    brandId: string;
    categoryId: string;
};

export const data: Product[] = Array(1000).fill(0).map((_, i) => ({
    id: `${i + 1}`,
    name: `Product ${i + 1}`,
    brandId: `${i + 1}`,
    categoryId: `${i + 1}`,
}));

export const products = {
    find: async (id: string): Promise<Product | null> => {
        console.log('\x1b[34m', `Find product with id ${id}`);
        return data.find(product => product.id === id) || null;
    },
    findAll: async (ids?: string[], batched: boolean = false): Promise<(Product | null)[]> => {
        if (isEmpty(ids)) {
            console.log('\x1b[34m', 'Find all products');
            return data;
        }

        console.log('\x1b[34m', `Find all products with ids ${JSON.stringify(ids)}`);

        if (batched) {
            return ids.map(id => data.find(product => product.id === id) || null);
        }

        return data.filter(product => ids.includes(product.id));
    },
};
