import { Product, products } from '../../fixtures/products';

const recommendedProducts = async (productId: string) => {
    const data: Product[] = await products.findAll();

    const recommended = +productId % 2 === 0
        ? data.filter(product => +product.id % 2 === 0)
        : data.filter(product => +product.id % 2 !== 0);

    return {
        ids: recommended.map(product => product.id)
    };
};

export const resolvers = {
    Query: {
        similarProducts: async (_: unknown, { productId }: { productId: string }) => recommendedProducts(productId),
        complementaryProducts: async (_: unknown, { productId }: { productId: string }) => await recommendedProducts(productId),
    },
    ProductRecommendation: {
        algorithmVersion: () => 'v1.0',
    }
};
