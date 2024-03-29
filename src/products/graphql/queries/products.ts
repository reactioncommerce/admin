import gql from "graphql-tag";

export default gql`
    query products($shopIds: [ID]! , $productIds: [ID], 
    $query: String, $first: ConnectionLimitInt, $offset: Int) {
        products(shopIds: $shopIds, productIds: $productIds, query: $query, first: $first, offset: $offset) {
            nodes {
            _id
            title
            slug
            currentProductHash
            description
            isVisible
            isDeleted
            metaDescription    
            originCountry
            media {
                URLs {
                thumbnail
                }
            }
            pricing {
                displayPrice
                price
            }
            price{
                max
                min
                range
            }
            publishedProductHash
            variants {
                _id
            }
            shop {
                _id
            }
            }
            pageInfo {
            hasNextPage
            }
            totalCount
        }
    }
    `;
