import { isEmpty } from 'lodash';
import DataLoader from 'dataloader';

export type Product = {
    id: string;
    name: string;
    brandId: string;
    categoryId: string;
};

export const data: Product[] = [
    {
        id: '1',
        name: 'Product 1',
        brandId: '1',
        categoryId: '5',
    },
    {
        id: '2',
        name: 'Product 2',
        brandId: '2',
        categoryId: '4',
    },
    {
        id: '3',
        name: 'Product 3',
        brandId: '3',
        categoryId: '3',
    },
    {
        id: '4',
        name: 'Product 4',
        brandId: '4',
        categoryId: '2',
    },
    {
        id: '5',
        name: 'Product 5',
        brandId: '5',
        categoryId: '1',
    },
    {
        id: '6',
        name: 'Product 6',
        brandId: '5',
        categoryId: '1',
    },
    {
        id: '7',
        name: 'Product 7',
        brandId: '4',
        categoryId: '2',
    },
    {
        id: '8',
        name: 'Product 8',
        brandId: '3',
        categoryId: '3',
    },
    {
        id: '9',
        name: 'Product 9',
        brandId: '2',
        categoryId: '4',
    },
    {
        id: '10',
        name: 'Product 10',
        brandId: '1',
        categoryId: '5',
    },
    {
        id: '11',
        name: 'Product 11',
        brandId: '1',
        categoryId: '1',
    },
    {
        id: '12',
        name: 'Product 12',
        brandId: '2',
        categoryId: '2',
    },
    {
        id: '13',
        name: 'Product 13',
        brandId: '3',
        categoryId: '3',
    },
    {
        id: '14',
        name: 'Product 14',
        brandId: '4',
        categoryId: '4',
    },
    {
        id: '15',
        name: 'Product 15',
        brandId: '5',
        categoryId: '5',
    },
];

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

export const buildProductDataloader = () => new DataLoader<string, Product | null>(
    async (keys: ReadonlyArray<string>) => products.findAll(keys as string[], true),
);
