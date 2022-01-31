import { BrandDataSource } from './BrandDataSource';
import { CategoryDataSource } from './CategoryDataSource';

interface Context {
    dataSources: {
        brand: BrandDataSource;
        category: CategoryDataSource;
    };
}

export const resolvers = {
    Query: {
        // With datasource
        brandById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.dataSources.brand.load(id),
        brands: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) => ctx.dataSources.brand.loadMany(ids),

        categoryById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.dataSources.category.load(id),
        categories: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) => ctx.dataSources.category.loadMany(ids),
    },
    Brand: {
        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.brand.load(reference.id),
    },
    Category: {
        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.category.load(reference.id),
    },
};
