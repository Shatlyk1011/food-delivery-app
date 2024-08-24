export const ORDER_MUTATION = `
mutation CreateOrder($orderData: mutationOrderInput!) {
  createOrder(data: $orderData) {
    id
    totalAmount
  }
}
`;
