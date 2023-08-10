import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: 'reference', url: 'http://localhost:4001' },
            { name: 'product', url: 'http://localhost:4003' },
        ],
    }),
});

const server = new ApolloServer({
    gateway,
    cache: undefined,
    introspection: true,
    logger: console,
    plugins: [
        ApolloServerPluginLandingPageLocalDefault({ footer: false }),
    ]
});

startStandaloneServer(server, { listen: { port: 8080 } })
    .then(({ url }) => {
        console.log('\x1b[36m%s\x1b[0m', `🚀 Server ready at ${url}`);
    })
    .catch((error) => {
        console.log('\x1b[31m', `🤦🏽 Failed to start sever: ${error}`);
    });

process.on('unhandledRejection', (error) => {
    console.log('\x1b[31m', `💥 uncaught exception: ${error}`);
});
