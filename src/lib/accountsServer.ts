import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AccountsClient } from "@accounts/client";
import { AccountsClientPassword } from "@accounts/client-password";
import { AccountsGraphQLClient } from "@accounts/graphql-client";

// const graphQlApiUrlHttp = process.env.PUBLIC_GRAPHQL_API_URL;
const graphQlApiUrlHttp = process.env.PUBLIC_GRAPHQL_API_URL;
console.log("graphQlApiUrlHttp", process.env);

const passwordClient = null;
let accountsClient : null | AccountsClient = null;

/**
 * Return and caches a copy of passwordClient and accountsClient.
 *
 * @returns {Object} of form { AccountsClientPassword, AccountsClient }
 */
export default function getAccountsHandler() {
  if (passwordClient && accountsClient) {
    return { passwordClient, accountsClient };
  }
  const cache = new InMemoryCache();

  const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

  const throwAwayGraphQLClient = new ApolloClient({
    cache,
    link: ApolloLink.from([httpLink])
  });

  // Create your transport
  const accountsGraphQL = new AccountsGraphQLClient({
    graphQLClient: throwAwayGraphQLClient
  });

  // Create the AccountsClient
  accountsClient = new AccountsClient(
    {
      // accountsClient Options
    },
    accountsGraphQL
  );

  return {
    passwordClient: new AccountsClientPassword(accountsClient),
    accountsClient
  };
}
