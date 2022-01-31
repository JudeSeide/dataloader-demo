import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer, gql } from 'apollo-server';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers';

const schema = `${__dirname}/schema.graphql`;
const typeDefs = gql`${readFileSync(schema, 'utf8')}`;

const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    tracing: true,
    introspection: true,
});

server.listen(4001)
    .then(({ url }) => {
        console.log('\x1b[36m%s\x1b[0m', `🚀 Server ready at ${url}`);
    })
    .catch((error) => {
        console.log('\x1b[31m', `🤦🏽 Failed to start sever: ${error}`);
    });
