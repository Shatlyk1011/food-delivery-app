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
  query Orders( $page: Int!, $limit: Int!) {
    Orders(
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
        deliveryPrice
        isDelivery
        totalAmount
        restaurantName
        dishes {
          quantity
          dish {
            title
            price
          }
        }
        createdAt
      }
    }
  }
`;
