/// <reference types="vite/client" />

declare module 'apollo-upload-client/UploadHttpLink.mjs' {
    import type { ApolloLink } from '@apollo/client';

    export default class UploadHttpLink extends ApolloLink {
        constructor(options?: { uri?: string; [key: string]: unknown });
    }
}
