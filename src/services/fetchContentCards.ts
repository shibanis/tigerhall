import { gql } from '@apollo/client';
import client from './apolloClient';
/**
 *  
 * query FetchContentCards {
  contentCards(filter: { keywords: "", limit: 100, offset: 0 ,types:[PODCAST]}) {
    edges {
      ... on Podcast {
        name
        image {
          uri
        }
        categories {
          name
        }
        participants {
          firstName
          lastName
          jobTitle
          company
        }
      }
    }
  }
}

 */
const GET_CONTENT_CARDS = gql`
  query GetContentCards($keywords: String, $limit: Int, $offset: Int) {
    contentCards(filter: {limit: $limit, keywords: $keywords, offset: $offset, types:[PODCAST]}) {
      edges {
        ... on Podcast {
          name
          image {
            uri
          }
          categories {
            name
          }
          participants {
            firstName
            lastName
            jobTitle
            company
          }
        }
      }
    }
  }
`;

export const fetchContentCards = async (keywords: string, limit: number, offset: number) => {
  const { data } = await client.query({
    query: GET_CONTENT_CARDS,
    variables: { keywords, limit, offset },
  });
  return data.contentCards.edges;
};
