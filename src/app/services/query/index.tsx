//shared/types/restaurants

// categories: {
//   in: { title: "all" }
// }

const USER_INFO = `
name
phone
`;

export const RESTAURANTS = `
  query Restaurants($limit: Int!, $pageParam: Int!, $sortBy: String) {
    Restaurants(
      where: {
        isBlocked: { equals: false },
      }, 
      limit: $limit,
      page: $pageParam,
      sort:$sortBy
      ) {
      docs {
        id
        title
        budgetCategory
        deliveryTime
        bannerImage {
          url
          alt
        }
        workingHours {
          closeTime
        }
        deliveryPrice
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

export const REGISTER_MUTATION = `
mutation CreateUser($userData: mutationUserInput!) {
  createUser(data: $userData) {
    name
  }
}
`;

export const LOGIN_MUTATION = `
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      exp
      token
      user {
        ${USER_INFO}
      }
    }
  }
`;

export const LOGIN_ME = `
  query LoginMe {
    meUser {
      user {
        ${USER_INFO}
      }
    }
  }
`;
