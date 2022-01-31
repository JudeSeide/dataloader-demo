import DataLoader from 'dataloader';
import { Brand, brands } from '../../fixtures/brands';
import { categories, Category } from '../../fixtures/categories';

interface Context {
    loaders: {
        brand: DataLoader<string, Brand>;
        category: DataLoader<string, Category>;
    };
}

export const resolvers = {
    Query: {
        // With dataloader
        brandById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.loaders.brand.load(id),
        brands: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) =>
            ids ? ctx.loaders.brand.loadMany(ids) : brands.findAll(ids),

        categoryById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.loaders.category.load(id),
        categories: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) =>
            ids ? ctx.loaders.category.loadMany(ids) : categories.findAll(ids),
    },
    Brand: {
        // With dataloader
        __resolveReference: async (reference: any, ctx: Context) => ctx.loaders.brand.load(reference.id),
    },
    Category: {
        // With dataloader
        __resolveReference: async (reference: any, ctx: Context) => ctx.loaders.category.load(reference.id),
    },
};
