import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { LOCAL_STATE_QUERY } from './ClientGQL/LocalGQL';
import { DOCKER_BACKEND_URL, BROWSER_TO_BACKEND_URL } from '../config';

function createClient({ headers }) {
    // if using docker, the URI to the Yoga server must be either:
    // DOCKER_BACKEND_URL = the name of the backend server set in the docker network (used in SSR fetches)
    // BROWSER_TO_BACKEND_URL = the URL of the backend server that can be accessed from the client (used in the client's browser fetches)
    const isInsideFrontendServer = typeof window === 'undefined';
    const uri = isInsideFrontendServer ? DOCKER_BACKEND_URL : BROWSER_TO_BACKEND_URL;
    return new ApolloClient({
        uri: uri,
        request: operation => {
            operation.setContext({
                fetchOptions: {
                    credentials: 'include',
                },
                headers,
            });
        },
        // local data
        clientState: {
            resolvers: {
                Mutation: {
                    toggleCart(_, variables, client) {
                        const { cartOpen } = client.cache.readQuery({
                            query: LOCAL_STATE_QUERY,
                        });
                        // toggle the state
                        const data = {
                            data: { cartOpen: !cartOpen },
                        };
                        client.cache.writeData(data);
                        return data;
                    },
                },
                Query: {
                    localState(_, variables, client) {
                        const localState = client.cache.readQuery({
                            query: LOCAL_STATE_QUERY,
                        });
                        return localState;
                    }
                }
            },
            defaults: {
                cartOpen: false,
            }
        }
    });
}

// TODO: check getDataFromTree warning - apollo
export default withApollo(createClient);