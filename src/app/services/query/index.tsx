// categories: {
//   in: { title: "all" }
// }

const USER_INFO = `
  name
  phone
  `;

//shared/types/restaurants
export const RESTAURANTS = `
  query Restaurants($limit: Int!, $pageParam: Int!, $sortBy: String, $query:String) {
    Restaurants(
      where: {
        AND: [
          {isBlocked: { equals: false }},
          {isClosed: { equals: false }},
          {title: { contains: $query }}
        ]
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

//shared/types/restaurantId
export const RESTAURANT = `
  query Restaurant($id: String!) {
    Restaurant(id: $id) {
      id
      title
      description
      address
      deliveryTime
      deliveryPrice
      freeAfterAmount
      workingHours {
        openTime
        closeTime
      }
      isClosed
      isDelivery
      bannerImage(where: {
        id: {equals: $id}
      }) {
        id
        url
        alt
      }
      dishes {
        id
        title
        description
        price
        gram
        availableAmount
        cookTime
        restaurant {
          id
          title
          isDelivery
        }
        image {
          url
          alt
        }
        categories {
          title
        }
      }

    }
  }
`;

export const RESTAURANT_BUCKET = `
  query Restaurant($id: String!) {
    Restaurant(id: $id) {
      id
      title
      address
      deliveryTime
      deliveryPrice
      isDelivery
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
    ${USER_INFO}
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

export const LOGOUT_MUTATION = `
mutation LogoutUser {
  logoutUser
}
`;
