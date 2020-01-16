import { InMemoryCache, HttpLink, ApolloClient } from "apollo-boost";

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

const link = new HttpLink({
    uri,
    headers: {
        "X-jWT": getToken()
    }
});

// const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
//     operation.setContext({
//         headers: {
//             "X-JWT": getToken()
//         }
//     });
//     return forward();
// });

const client = new ApolloClient({
    cache,
    link,
    resolvers: {
        Mutation: {
            UserLoggedIn: (_, { token }, { cache }) => {
                localStorage.setItem('x-jwt', token);
                cache.writeData({
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