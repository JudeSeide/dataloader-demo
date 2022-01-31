import { ProductDataSource } from './ProductDataSource';
import { connectionFromArray } from 'graphql-relay';
import { intersection, isEmpty } from 'lodash';
import { Product } from '../../fixtures/products';

interface Context {
    dataSources: {
        product: ProductDataSource;
    };
}

const productsResolver = async (_: unknown, args: any, ctx: Context) => {
    const count = args.first || args.last;
    const maxAllowed = 10;

    if (count > maxAllowed) {
        throw new Error(`Max number of products allowed is ${maxAllowed}`);
    }

    const ids = args?.where?.id?.in;
    const hits = await ctx.dataSources.product.loadMany(ids);

    return connectionFromArray(hits, args);
};

export const resolvers = {
    Query: {
        // With datasource
        productById: async (_: unknown, { id }: { id: string }, ctx: Context) => ctx.dataSources.product.load(id),
        products: productsResolver,
    },
    Product: {
        brand: (parent: Product) => ({ id: parent.brandId }),
        category: (parent: Product) => ({ id: parent.categoryId }),

        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.product.load(reference.id),
    },
    ProductRecommendation: {
        // With datasource
        products: async (root: { ids?: string[] }, args: any, ctx: Context) => {
            const where = isEmpty(args.where)
                ? { id: { in: root.ids } }
                : [args.where].map(clause => {
                    clause.id = { ...clause.id, in: clause.id?.in ? intersection(root.ids, clause.id.in) : root.ids };
                    return clause;
                })[0];

            return productsResolver(root, { ...args, where }, ctx);
        },
    }
};
