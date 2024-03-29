import buildApolloClient, { buildQuery as buildQueryFactory } from "ra-data-graphql-simple";
import { CREATE, GET_LIST } from "ra-core";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import productsQuery from "../products/graphql/queries/products";
import productQuery from "../products/graphql/queries/product";
import createProduct from "../products/graphql/mutations/createProduct";

const graphqlURL = process.env.PUBLIC_GRAPHQL_API_URL;
const graphqlAPI = "http://localhost:3000/graphql";


const getGqlResource = (resource) => {
  switch (resource) {
    case "users":
      return "Users";

    case "Products":
      return "Products";

    case "product":
      return "Product";

    case "Settings":
      return "Settings";

    case "Shop":
      return "Shop";

    default:
      throw new Error(`Unknown resource ${resource}`);
  }
};

const customBuildQuery = (introspectionResults) => {
  const buildQuery = buildQueryFactory(introspectionResults);
  return (type, resource, params) => {
    /* eslint-disable no-param-reassign*/
    if (type === "GET_LIST" && resource === "Products") {
      return {
        query: productsQuery,
        variables: { shopIds: [process.env.REACT_APP_SHOP_ID] },
        parseResponse: ({ data }) => {
          const products = data.products.nodes;
          products.forEach((product) => {
            product.id = product._id;
          });
          const total = products.length;
          return { data: products, total };
        }
      };
    }
    if (type === "GET_ONE" && resource === "Products") {
      return {
        query: productQuery,
        variables: { shopId: process.env.REACT_APP_SHOP_ID, productId: params.id },
        parseResponse: ({ data }) => {
          const { product } = data;
          product.id = product._id;
          return { data: product };
        }
      };
    }
    if (type === CREATE) {
      // const CreateProductInput = { product: { title: params.data }, shopId: process.env.REACT_APP_SHOP_ID };
      return {
        query: createProduct,
        parseResponse: ({ data }) => {
          if (data[`create${resource}`]) {
            return { data: { id: process.env.REACT_APP_SHOP_ID } };
          }
          data.createProduct.product.id = data.createProduct.product._id;
          return { data: data.createProduct.product };
          // throw new Error(`Could not create ${resource}`);
        }
      };
    }
    return buildQuery(type, resource, params);
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => {
  const httpLink = new HttpLink({
    uri: graphqlAPI
  });

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(() => {
      const accessToken = localStorage.getItem("accounts:accessToken");
      if (accessToken) {
        return {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        };
      }
      return {};
    });
    return forward(operation);
  });

  const standardLink = ApolloLink.from([
    authLink,
    httpLink
  ]);

  return buildApolloClient({
    clientOptions: {
      uri: graphqlURL,
      link: standardLink,
      cache: new InMemoryCache()
    },
    introspection: {
      operationNames: {
        [GET_LIST]: (resource) => `get${resource.name}`,
        [CREATE]: (resource) => `create${resource.name}`
      }
    },
    buildQuery: customBuildQuery
  }).then((dataProvider) => (type, resource, params) => dataProvider(type, getGqlResource(resource), params)).catch((err) => console.log("ERROR", err));
};
