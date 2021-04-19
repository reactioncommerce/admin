/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable  node/no-extraneous-import */
/* eslint-disable  arrow-body-style */
/* eslint-disable no-undef */
import buildApolloClient, { buildQuery as buildQueryFactory } from "ra-data-graphql-simple";
import { CREATE, GET_LIST } from "ra-core";
import gql from "graphql-tag";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import productsQuery from "../products/graphql/queries/products.js";
import createProduct from "../products/graphql/mutations/createProduct";

  const getGqlResource = (resource) => {
    switch (resource) {
      case "users":
        return "Users";

      case "Products":
        return "Products";

      case "product":
        return "Product";
  
      default:
        throw new Error(`Unknown resource ${resource}`);
    }
  };
  
  const customBuildQuery = (introspectionResults) => {
    const buildQuery = buildQueryFactory(introspectionResults);
    return (type, resource, params) => {
      /* eslint-disable no-param-reassign*/
      if (type === "GET_LIST" && resource === "Products") {
        params = { shopIds: [process.env.REACT_APP_SHOP_ID] };
        return {
          query: productsQuery,
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
      if (type === CREATE) {
        const CreateProductInput = { product: { title: params.data }, shopId: process.env.REACT_APP_SHOP_ID };
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

  export default () => {
    const httpLink = new HttpLink({ 
      uri: "http://localhost:3000/graphql"
    });

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(() => ({
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
        }
      }));
  
      return forward(operation);
    });

    const standardLink = ApolloLink.from([
      authLink,
      httpLink
    ]);

    return buildApolloClient({
      clientOptions: {
        uri: "http://localhost:3000/graphql",
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
    }).then((dataProvider) => (type, resource, params) => {
        return dataProvider(type, getGqlResource(resource), params);
    }).catch((err) => console.log("ERROR", err));
  };