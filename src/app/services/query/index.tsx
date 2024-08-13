//shared/types/restaurants

export const RESTAURANTS = `
  query Restaurants($limit: Int!, $page: Int!, ) {
    Restaurants(where: {isBlocked: {equals: false} }, limit: $limit, page: $page) {
      docs {
        id
        title
        budgetCategory
        bannerImage {
          url
          alt
        }
      }
      totalDocs
      limit
      page
      totalPages
    }
  }
`;
