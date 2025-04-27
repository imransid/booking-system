import { gql } from "@apollo/client";

// GraphQL query to fetch hospitals
export const GET_HOSPITALS_QUERY = gql`
  query Hospitals {
    hospitals {
      totalPages
      currentPage
      totalCount
      hospitals {
        id
        name
        services
        imageUrl
        createdAt
        updatedAt
      }
    }
  }
`;
