import DataLoader from 'dataloader';

import { Tag, tags } from '../../fixtures/tags';

export class TagDataSource {
    private readonly loader: DataLoader<string, Tag | null>;

    constructor() {
        this.loader = new DataLoader(async (keys: ReadonlyArray<string>) => tags.findAll(keys as string[], true));
    }

    public load = async (id: string): Promise<Tag | null> => this.loader.load(id);

    public loadMany = async (ids?: string[]): Promise<(Tag | Error | null)[]> =>
        ids ? this.loader.loadMany(ids) : tags.findAll(ids);
}
