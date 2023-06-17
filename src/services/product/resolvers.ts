import { connectionFromArray } from 'graphql-relay';
import { Product } from '../../fixtures/products';
import { Tag as BaseTag } from '../../fixtures/tags';

import { ProductDataSource } from './ProductDataSource';

interface Context {
    dataSources: {
        product: ProductDataSource;
    };
}

type Tag = BaseTag & {
    productCount: number;
};

const aggregate = (products: Product[], field: keyof Omit<Product, 'tags'>) =>
    Object.values(products.reduce((acc, hit) => {
        const value = hit[field];

        if (acc[value]) {
            acc[value].productCount++;
            return acc;
        }

        acc[value] = {
            id: value,
            productCount: 1,
        };

        return acc;
    }, []));

const aggregateTree = (products: Product[]): Partial<Tag>[] => {
    const tagsMap: Map<string, Partial<Tag>> = new Map();

    products.forEach((product) => {
        product.tags.forEach((tag) => {
            const { level0, level1 } = tag;

            if (!tagsMap.has(level0)) {
                tagsMap.set(level0, {
                    id: level0,
                    productCount: 1,
                    children: [],
                });
            }

            const currentTag = tagsMap.get(level0)!;
            currentTag.productCount++;

            if (level1 !== null) {
                if (currentTag.children[level1]) {
                    currentTag.children[level1].productCount++;
                } else {
                    currentTag.children[level1] = {
                        id: level1,
                        productCount: 1,
                        children: [],
                    };
                }
            }
        });
    });

    return Array.from(tagsMap.values()).map((tag) => ({
        ...tag,
        children: Object.values(tag.children),
    }));
};

const productsResolver = async (_: unknown, args: any, ctx: Context) => {
    const hits = await ctx.dataSources.product.loadMany() as Product[];

    const brands = aggregate(hits, 'brandId');
    const categories = aggregate(hits, 'categoryId');

    return {
        ...connectionFromArray(hits, args),
        metadata: {
            brands,
            categories,
            tags: aggregateTree(hits),
        }
    };
};

export const resolvers = {
    Query: {
        // With datasource
        products: productsResolver,
    },
    Product: {
        brand: (parent: Product) => ({ id: parent.brandId }),
        category: (parent: Product) => ({ id: parent.categoryId }),

        // With datasource
        __resolveReference: async (reference: any, ctx: Context) => ctx.dataSources.product.load(reference.id),
    }
};
