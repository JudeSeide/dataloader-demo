import { ApolloGateway, } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { GraphQLService } from 'apollo-server-core/src/types';

const gateway = new ApolloGateway({
    serviceList: [
        { name: 'reference', url: 'http://localhost:4001' },
        { name: 'recommendation', url: 'http://localhost:4002' },
        { name: 'product', url: 'http://localhost:4003' },
    ],
});

const server = new ApolloServer({
    gateway: gateway as unknown as GraphQLService,
    subscriptions: false,
    tracing: true,
    introspection: true,
    cacheControl: {
        defaultMaxAge: 1,
        calculateHttpHeaders: false,
    },
});

server.listen(8080)
    .then(({ url }) => {
        console.log('\x1b[36m%s\x1b[0m', `🚀 Server ready at ${url}`);
    })
    .catch((error) => {
        console.log('\x1b[31m', `🤦🏽 Failed to start sever: ${error}`);
    });

process.on('unhandledRejection', (error) => {
    console.log('\x1b[31m', `💥 uncaught exception: ${error}`);
});
