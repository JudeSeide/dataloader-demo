import DataLoader from 'dataloader';

import { Product, products } from '../../fixtures/products';

export class ProductDataSource {
    private readonly loader: DataLoader<string, Product | null>;

    constructor() {
        this.loader = new DataLoader(async (keys: ReadonlyArray<string>) => products.findAll(keys as string[], true));
    }

    public load = async (id: string): Promise<Product | null> => this.loader.load(id);

    public loadMany = async (ids?: string[]): Promise<(Product | Error | null)[]> =>
        ids ? this.loader.loadMany(ids) : products.findAll(ids);
}
