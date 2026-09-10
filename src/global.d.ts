import '@apollo/client';

declare global {
    interface Window {
        env: Record<string, string>;
    }
}

declare module '@apollo/client' {
    namespace ApolloClient {
        namespace DeclareDefaultOptions {
            interface WatchQuery {
                errorPolicy: 'all';
            }
            interface Query {
                errorPolicy: 'all';
            }
        }
    }
}

export {};
