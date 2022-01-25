import DataLoader from 'dataloader';
import { DataSource } from 'apollo-datasource';
import { Product, products } from '../../fixtures/products';

export class ProductDataSource extends DataSource {
    private readonly loader: DataLoader<string, Product | null>;

    constructor() {
        super();
        this.loader = new DataLoader((keys: ReadonlyArray<string>) => products.findAll(keys as string[], true));
    }

    public load = async (id: string): Promise<Product | null> => this.loader.load(id);

    public loadMany = async (ids?: string[]): Promise<(Product | Error | null)[]> =>
        ids ? this.loader.loadMany(ids) : products.findAll(ids);
}
