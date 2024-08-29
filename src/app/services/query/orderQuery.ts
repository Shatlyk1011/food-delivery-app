export const ORDER_MUTATION = `
mutation CreateOrder($orderData: mutationOrderInput!) {
  createOrder(data: $orderData) {
    id
    totalAmount
  }
}
`;

//shared/types/restaurants
export const USER_ORDERS = `
  query Orders($userId: String!, $page: Int!, $limit: Int!) {
    Orders(
      where: {
        orderedByUser: { equals: $userId }
      },
      limit: $limit,
      page: $page,
      sort: "-createdAt"
    ) {
      docs {
        id
        district
        apartment
        houseNumber
        orderStatus
        isDelivery
        totalAmount
        restaurantName
        dishes {
          quantity
          dish {
            title
            price
            image {
              url
              alt
            }
          }
        }
        createdAt
      }
    }
  }
`;