import { Product, products } from '../../fixtures/products';

export const resolvers = {
    Query: {
        // Without datasource
        productById: async (_: unknown, { id }: { id: string }) => products.find(id),
        products: async (_: unknown, { ids }: { ids?: string[] }) => products.findAll(ids),
    },
    Product: {
        brand: (parent: Product) => ({ id: parent.brandId }),
        category: (parent: Product) => ({ id: parent.categoryId }),

        // Without datasource
        __resolveReference: async (reference: any) => products.find(reference.id),
    },
    ProductRecommendation: {
        // Without datasource
        products: async (root: { ids?: string[] }, args: any) => products.findAll(root.ids),
    }
};
