import { isEmpty } from 'lodash';

export type Brand = {
    id: string;
    name: string;
};

export const data: Brand[] = [
    {
        id: '1',
        name: 'Adidas',
    },
    {
        id: '2',
        name: 'Nike',
    },
    {
        id: '3',
        name: 'Puma',
    },
    {
        id: '4',
        name: 'Reebok',
    },
    {
        id: '5',
        name: 'Vans',
    },
];

export const brands = {
    find: async (id: string): Promise<Brand | null> => {
        console.log('\x1b[32m', `Find brand with id ${id}`);
        return data.find(brand => brand.id === id) || null;
    },
    findAll: async (ids?: string[], batched: boolean = false): Promise<(Brand | null)[]> => {
        if (isEmpty(ids)) {
            console.log('\x1b[32m', 'Find all brands');
            return data;
        }

        console.log('\x1b[32m', 'Find all brands with ids', ids);

        if (batched) {
            return ids.map(id => data.find(brand => brand.id === id) || null);
        }

        return data.filter(brand => ids.includes(brand.id));
    },
};
