import { KeyValueCache, KeyValueCacheSetOptions } from 'apollo-server-caching';

export class InMemoryCache<V = string> implements KeyValueCache<V> {
    private data: Record<string, V> = {};

    public async set(key: string, value: V, options?: KeyValueCacheSetOptions): Promise<void> {
        this.data[key] = value;
    }

    public async get(key: string): Promise<V | undefined> {
        return this.data[key];
    }

    public async delete(key: string): Promise<boolean> {
        delete this.data[key];
        return this.data[key] === undefined;
    }
}
