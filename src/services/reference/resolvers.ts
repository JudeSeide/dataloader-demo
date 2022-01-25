import { connectionFromArray } from 'graphql-relay';
import { BrandDataSource } from './BrandDataSource';
import { CategoryDataSource } from './CategoryDataSource';
import { brands } from '../../fixtures/brands';
import { categories } from '../../fixtures/categories';

interface Context {
    dataSources: {
        brand: BrandDataSource;
        category: CategoryDataSource;
    };
}

export const resolvers = {
    Query: {
        // Without datasource
        brandById: async (_: unknown, { id }: { id: string }) => brands.find(id),
        connectedBrands: async (_: unknown, args: any) =>
            connectionFromArray(await brands.findAll(args.ids), args),

        categoryById: async (_: unknown, { id }: { id: string }) => categories.find(id),
        connectedCategories: async (_: unknown, args: any) =>
            connectionFromArray(await categories.findAll(args.ids), args),

        // // With datasource
        // brandById: async (_: unknown, { id }: { id: string }, { dataSources }: Context) => dataSources.brand.load(id),
        // connectedBrands: async (_: unknown, args: any, { dataSources }: Context) =>
        //     connectionFromArray(await dataSources.brand.loadMany(args.ids), args),
        //
        // categoryById: async (_: unknown, { id }: { id: string }, { dataSources }: Context) => dataSources.category.load(id),
        // connectedCategories: async (_: unknown, args: any, { dataSources }: Context) =>
        //     connectionFromArray(await dataSources.category.loadMany(args.ids), args),
    },
    Brand: {
        // Without datasource
        __resolveReference: async (reference: any) => brands.find(reference.id),

        // // With datasource
        // __resolveReference: async (reference: any, { dataSources }: Context) => dataSources.brand.load(reference.id),
    },
    Category: {
        // Without datasource
        __resolveReference: async (reference: any) => categories.find(reference.id),

        // // With datasource
        // __resolveReference: async (reference: any, { dataSources }: Context) => dataSources.category.load(reference.id),
    },
};
