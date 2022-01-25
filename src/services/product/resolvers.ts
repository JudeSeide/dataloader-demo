import { connectionFromArray } from 'graphql-relay';
import { intersection, isEmpty } from 'lodash';
import { ProductDataSource } from './ProductDataSource';
import { Product, products } from '../../fixtures/products';

interface Context {
    dataSources: {
        product: ProductDataSource;
    };
}

const connectedProductsResolver = async (_: unknown, args: any) => {
    const ids = args?.where?.id?.in;
    const hits = await products.findAll(ids);

    return connectionFromArray(hits, args);
};

const connectedProductsWithDataSourceResolver = async (_: unknown, args: any, ctx: Context) => {
    const ids = args?.where?.id?.in;
    const hits = await ctx.dataSources.product.loadMany(ids);

    return connectionFromArray(hits, args);
};

export const resolvers = {
    Query: {
        // Without datasource
        productById: async (_: unknown, { id }: { id: string }) => products.find(id),
        connectedProducts: connectedProductsResolver,

        // // With datasource
        // productById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.dataSources.product.load(id),
        // connectedProducts: connectedProductsWithDataSourceResolver,
    },
    Product: {
        brand: (parent: Product) => ({ id: parent.brandId }),
        category: (parent: Product) => ({ id: parent.categoryId }),

        // Without datasource
        __resolveReference: async (reference: any) => products.find(reference.id),

        // // With datasource
        // __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.product.load(reference.id),
    },
    ProductRecommendation: {
        // Without datasource
        products: (root: { ids?: string[] }, args: any) => {
            const where = isEmpty(args.where)
                ? [{ id: { in: root.ids } }]
                : [...args.where].map(clause => {
                    clause.id = { ...clause.id, in: clause.id?.in ? intersection(root.ids, clause.id.in) : root.ids };
                    return clause;
                });

            return connectedProductsResolver(root, { ...args, where });
        },

        // // With datasource
        // products: async (root: { ids?: string[] }, args: any, ctx: Context) => {
        //     const where = isEmpty(args.where)
        //         ? [{ id: { in: root.ids } }]
        //         : [...args.where].map(clause => {
        //             clause.id = { ...clause.id, in: clause.id?.in ? intersection(root.ids, clause.id.in) : root.ids };
        //             return clause;
        //         });
        //
        //     return connectedProductsWithDataSourceResolver(root, { ...args, where }, ctx);
        // },
    }
};
