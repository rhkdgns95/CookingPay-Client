import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-link"; 
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { OperationDefinitionNode, FragmentDefinitionNode } from "graphql";


// import { ApolloClient, HttpLink, ApolloLink, Operation, InMemoryCache  } from "@apollo/client";

const PRODUCTION_URL: string = "http://ec2-18-212-24-8.compute-1.amazonaws.com:4000/graphql";
const uri: string = process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:4000/graphql";
const wsUri: string = `ws://localhost:4000/subscription`;

const getToken = () => localStorage.getItem("x-jwt") || "";

const cache = new InMemoryCache();

cache.writeData({
    data: {
        auth: {
            __typename: "Auth",
            isLoggedIn: Boolean(getToken())
        }
    }
});

// Create a http Link:
const httpLink = createHttpLink({
    uri,
    headers: {
        "X-JWT": getToken()
    }
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
        reconnect: true
    }
});

const authMiddleware = new ApolloLink((operation, forward: any) => {
    
    operation.setContext({
        headers: {
            "X-JWT": getToken()
        }
    });
    return forward(operation);
});
const link = split(
    ({ query }) => {
        const definition: OperationDefinitionNode | FragmentDefinitionNode = getMainDefinition(query);
        console.log("definition: ", definition);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authMiddleware.concat(httpLink)
)
// const link = authMiddleware.concat(httpLink);

const client = new ApolloClient({
    cache,
    link,
    resolvers: {
        Mutation: {
            UserLoggedIn: (_, { token }, { cache: currentCache }) => {
                localStorage.setItem('x-jwt', token);
                // console.log("LOGGEx`D_IN: ", token);
                currentCache.writeData({
                    data: {
                        auth: {
                            __typename: "Auth",
                            isLoggedIn: true
                        }
                    }
                });
                return null;
            },
            UserLoggedOut: (_, __, { cache }) => {
                localStorage.removeItem('x-jwt');
                cache.writeData({
                    data: {
                        auth: {
                            __typename: "Auth",
                            isLoggedIn: false
                        }
                    }
                });
                return null;
            }
        }
    }
});

export default client;