//shared/types/restaurants

export const RESTAURANTS = `
  query Restaurants($limit: Int!, $pageParam: Int!, $sortBy: String) {
    Restaurants(where: {isBlocked: {equals: false} }, limit: $limit, page: $pageParam, sort:$sortBy) {
      docs {
        id
        title
        budgetCategory
        deliveryTime
        bannerImage {
          url
          alt
        }
      }
    }
  }
`;

//shared/types/restaurants
export const CATEGORIES = `
  query Categories($limit: Int!,) {
    Categories(limit: $limit) {
      docs {
        title
      }
    }
  }
`;
