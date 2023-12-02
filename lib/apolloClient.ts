import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    from,
  } from '@apollo/client';
  import { setContext } from '@apollo/client/link/context';
  import { supabase } from '@lib/supabase';
  import { onError } from '@apollo/client/link/error';
  
  const graphqlEndpoint = process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT;
  console.log('graphqlEndpoint', graphqlEndpoint)
  
  const httpLink = createHttpLink({
    uri: graphqlEndpoint,
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
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        notifyOnNetworkStatusChange: true,
      },
    },
  });
  
  export default apolloClient;
  