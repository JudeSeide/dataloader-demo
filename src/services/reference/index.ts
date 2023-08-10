import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';

import { BrandDataSource } from './BrandDataSource';
import { CategoryDataSource } from './CategoryDataSource';
import { resolvers } from './resolvers';
import { TagDataSource } from './TagDataSource';

const schema = `${__dirname}/schema.graphql`;
const typeDefs = gql`${readFileSync(schema, 'utf8')}`;

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    introspection: true,
    logger: console,
    cache: undefined,
});

startStandaloneServer(server, {
    listen: { port: 4001 },
    context: async ({ req }) => ({
        dataSources: {
            brand: new BrandDataSource(),
            category: new CategoryDataSource(),
            tag: new TagDataSource(),
        },
    }),
}).then(({ url }) => {
    console.log('\x1b[36m%s\x1b[0m', `🚀 Server ready at ${url}`);
}).catch((error) => {
    console.log('\x1b[31m', `🤦🏽 Failed to start sever: ${error}`);
});
