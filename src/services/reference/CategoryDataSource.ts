import DataLoader from 'dataloader';

import { categories, Category } from '../../fixtures/categories';

export class CategoryDataSource {
    private readonly loader: DataLoader<string, Category | null>;

    constructor() {
        this.loader = new DataLoader(async (keys: ReadonlyArray<string>) => categories.findAll(keys as string[], true));
    }

    public load = async (id: string): Promise<Category | null> => this.loader.load(id);

    public loadMany = async (ids?: string[]): Promise<(Category | Error | null)[]> =>
        ids ? this.loader.loadMany(ids) : categories.findAll(ids);
}
