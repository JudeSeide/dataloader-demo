import DataLoader from 'dataloader';

import { Brand, brands } from '../../fixtures/brands';

export class BrandDataSource {
    private readonly loader: DataLoader<string, Brand | null>;

    constructor() {
        this.loader = new DataLoader(async (keys: ReadonlyArray<string>) => brands.findAll(keys as string[], true));
    }

    public load = async (id: string): Promise<Brand | null> => this.loader.load(id);

    public loadMany = async (ids?: string[]): Promise<(Brand | Error | null)[]> =>
        ids ? this.loader.loadMany(ids) : brands.findAll(ids);
}
