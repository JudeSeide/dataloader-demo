import { isEmpty } from 'lodash';

export type Category = {
    id: string;
    name: string;
};

export const data: Category[] = Array(10).fill(0).map((_, i) => ({
    id: `${i + 1}`,
    name: `Category ${i + 1}`,
}));

export const categories = {
    find: async (id: string): Promise<Category | null> => {
        console.log('\x1b[33m', `Find category with id ${id}`);
        return data.find(category => category.id === id) || null;
    },
    findAll: async (ids?: string[], batched: boolean = false): Promise<(Category | null)[]> => {
        if (isEmpty(ids)) {
            console.log('\x1b[33m', 'Find all categories');
            return data;
        }

        console.log('\x1b[33m', 'Find all categories with ids', ids);

        if (batched) {
            return ids.map(id => data.find(category => category.id === id) || null);
        }

        return data.filter(category => ids.includes(category.id));
    },
};
