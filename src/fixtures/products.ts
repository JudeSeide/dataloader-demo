import { isEmpty } from 'lodash';

import { data as brandData } from './brands';
import { data as categoryData } from './categories';
import { data as tagData } from './tags';

const randomSelect = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export type Product = {
    id: string;
    name: string;
    brandId: string;
    categoryId: string;
    tags: { level0: string, level1: string | null }[];
};

export const data: Product[] = Array(10000).fill(0).map((_, i) => {
    const tag1 = randomSelect(tagData);
    const tag2 = randomSelect(tagData);

    return {
        id: `${i + 1}`,
        name: `Product ${i + 1}`,
        brandId: randomSelect(brandData).id,
        categoryId: randomSelect(categoryData).id,
        tags: [
            {
                level0: tag1.id,
                level1: tag1.children ? randomSelect(tag1.children).id : null,
            },
            {
                level0: tag2.id,
                level1: tag2.children ? randomSelect(tag2.children).id : null,
            }
        ]
    };
});

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
