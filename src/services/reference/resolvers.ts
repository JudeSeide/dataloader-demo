import { brands } from '../../fixtures/brands';
import { categories } from '../../fixtures/categories';

export const resolvers = {
    Query: {
        // Without datasource
        brandById: async (_: unknown, { id }: { id: string }) => brands.find(id),
        brands: async (_: unknown, { ids }: { ids?: string[] }) => brands.findAll(ids),

        categoryById: async (_: unknown, { id }: { id: string }) => categories.find(id),
        categories: async (_: unknown, { ids }: { ids?: string[] }) => categories.findAll(ids),
    },
    Brand: {
        // Without datasource
        __resolveReference: async (reference: any) => brands.find(reference.id),
    },
    Category: {
        // Without datasource
        __resolveReference: async (reference: any) => categories.find(reference.id),
    },
};
