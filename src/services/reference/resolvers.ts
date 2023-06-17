import { BrandDataSource } from './BrandDataSource';
import { CategoryDataSource } from './CategoryDataSource';
import { TagDataSource } from './TagDataSource';

interface Context {
    dataSources: {
        brand: BrandDataSource;
        category: CategoryDataSource;
        tag: TagDataSource;
    };
}

export const resolvers = {
    Brand: {
        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.brand.load(reference.id),
    },
    Category: {
        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.category.load(reference.id),
    },
    Tag: {
        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.tag.load(reference.id),
    },
};
