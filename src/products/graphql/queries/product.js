/* eslint-disable node/no-extraneous-import */
import gql from "graphql-tag";

export default gql`
query Product ($productId:ID!, $shopId:ID!){
    product(productId:$productId, shopId:$shopId){
     _id
     title
     pageTitle
     slug
     description
     isDeleted
     isVisible
     pageTitle
     productType
     shop{
       _id
       name
     }
     variants{
       _id
       title
       price
     }
     pricing{
       price
     }
     vendor
     originCountry
     shouldAppearInSitemap
   }
}`;
