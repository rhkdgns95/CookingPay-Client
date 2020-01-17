import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link"; 
// import { ApolloClient, HttpLink, ApolloLink, Operation, InMemoryCache  } from "@apollo/client";

const uri: string = "http://localhost:4000/graphql";

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

const httpLink = createHttpLink({
    uri,
    headers: {
        "X-JWT": getToken()
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
const link = authMiddleware.concat(httpLink);

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