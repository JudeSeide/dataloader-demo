import { ProductDataSource } from './ProductDataSource';
import { Product } from '../../fixtures/products';

interface Context {
    dataSources: {
        product: ProductDataSource;
    };
}

export const resolvers = {
    Query: {
        // With datasource
        productById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.dataSources.product.load(id),
        products: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) => ctx.dataSources.product.loadMany(ids),
    },
    Product: {
        brand: (parent: Product) => ({ id: parent.brandId }),
        category: (parent: Product) => ({ id: parent.categoryId }),

        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.product.load(reference.id),
    },
    ProductRecommendation: {
        // With datasource
        products: async (root: { ids?: string[] }, args: any, ctx: Context) => ctx.dataSources.product.loadMany(root.ids),
    }
};
