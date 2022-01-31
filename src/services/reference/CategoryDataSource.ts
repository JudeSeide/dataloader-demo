import DataLoader from 'dataloader';
import { DataSource } from 'apollo-datasource';
import { categories, Category } from '../../fixtures/categories';

export class CategoryDataSource extends DataSource {
    private readonly loader: DataLoader<string, Category | null>;

    constructor() {
        super();
        this.loader = new DataLoader(async (keys: ReadonlyArray<string>) => categories.findAll(keys as string[], true));
    }

    public load = async (id: string): Promise<Category | null> => categories.find(id); // this.loader.load(id);

    public loadMany = async (ids?: string[]): Promise<(Category | Error | null)[]> =>
        categories.findAll(ids); // ids ? this.loader.loadMany(ids) : categories.findAll(ids);
}
