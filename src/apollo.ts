import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split, Operation } from "apollo-link"; 
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { OperationDefinitionNode, FragmentDefinitionNode } from "graphql";


// import { ApolloClient, HttpLink, ApolloLink, Operation, InMemoryCache  } from "@apollo/client";

// const PRODUCTION_URL: string = "http://ec2-18-212-24-8.compute-1.amazonaws.com:4000/graphql";

const PRODUCTION_URL: string = "https://cooking-pay.herokuapp.com:4000/graphql";
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
// - reconnect: 서버 연결이 끊어져도 계속해서 connect요청을 보낸다.
// - connectionParams: 로그인 유저인지 파악할 수 있도록 한다. 
// ( token전송하여, 서버측의 onConnect에서 connectionParams["X-JWT"]를 확인하면된다. )
const wsLink = new WebSocketLink({
    uri: wsUri,
    options: {
        reconnect: true,
        connectionParams: {
            "X-JWT": getToken()
        },
    },
});

const authMiddleware: ApolloLink = new ApolloLink((operation: Operation, forward: any) => {
    operation.setContext({
        headers: {
            "X-JWT": getToken()
        }
    });
    return forward(operation);
});


// Network Fetch: 
// 클라이언트에서 서버에 요청하는 쿼리문을 split확인.
// true면 첫번째 인지 - wsLink / false면 두번째 인자 - authMiddleware.concat(http);
//
// 아래 Fetch 특성을 나열
// 
// Query면, definition.operation = query.
// Mutation이면, definition.operation = mutation.
// Subscription이면, definition.operation = subscription.
const link = split(
    ({ query }) => {
        const definition: OperationDefinitionNode | FragmentDefinitionNode = getMainDefinition(query);
        // console.log("definition: ", definition);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    // wsLink,
    // httpLink
    authMiddleware.concat(wsLink),
    authMiddleware.concat(httpLink)
);
// const link = authMiddleware.concat(httpLink);


// localStateLink

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