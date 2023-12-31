import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { supabase } from '@lib/supabase';
import { onError } from '@apollo/client/link/error';

const graphqlEndpoint = process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT;
console.log('endpoint', graphqlEndpoint)

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
  fetch,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Path: ${path}`);
      console.log(
        'Locations:',
        locations?.forEach((location) => console.log(location)),
      );
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, { headers: defaultHeaders }) => {
  // get the authentication token from local storage if it exists
  const headers = {
    ...defaultHeaders,
    authorization: '',
  };
  const { data } = await supabase.auth.getSession();
  const isAuthenticated = !!(data && data.session);
  if (isAuthenticated) {
    headers.authorization = `Bearer ${data.session.access_token}`;
  }
  // return the headers to the context so httpLink can read them
  return {
    headers,
  };
});

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Booking: {
        fields: {
          totalDue: {
            merge(existing, incoming) {
              return incoming || existing;
            },
          },
          paymentReceived: {
            merge(existing, incoming) {
              return incoming || existing;
            },
          },
        },
      },
      Query: {
        fields: {
          user: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
          artist: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
          bookings: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
          artistBookings: {
            merge(existing = [], incoming: any[]) {
              // Use a Set to ensure unique IDs
              const bookings = new Set(
                existing.map((booking: any) => booking.__ref),
              );

              // Add incoming bookings if they are not already in the cache
              incoming.forEach((booking: any) => {
                bookings.add(booking.__ref);
              });

              // Convert Set back to an array
              return Array.from(bookings).map((ref) => ({ __ref: ref }));
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    query: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
  },
});

export default apolloClient;
