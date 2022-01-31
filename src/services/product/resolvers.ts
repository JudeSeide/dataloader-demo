import DataLoader from 'dataloader';
import { Product, products } from '../../fixtures/products';

interface Context {
    loaders: {
        product: DataLoader<string, Product>;
    };
}

export const resolvers = {
    Query: {
        // With dataloader
        productById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.loaders.product.load(id),
        products: async (_: unknown, { ids }: { ids?: string[] }, ctx: Context) =>
            ids ? ctx.loaders.product.loadMany(ids) : products.findAll(ids),
    },
    Product: {
        brand: (parent: Product) => ({ id: parent.brandId }),
        category: (parent: Product) => ({ id: parent.categoryId }),

        // With dataloader
        __resolveReference: async (reference: any, ctx: Context) => ctx.loaders.product.load(reference.id),
    },
    ProductRecommendation: {
        // With dataloader
        products: async (root: { ids?: string[] }, args: any, ctx: Context) => ctx.loaders.product.loadMany(root.ids),
    }
};
