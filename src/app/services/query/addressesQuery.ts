export const CREATE_ADDRESS_MUTATION = `
mutation UpdateUser ($id: String!, $userData: mutationUserUpdateInput!) {
  updateUser (id: $id, data: $userData) {
    id
    name
    phone
    addresses {
      district,
      houseNumber
      apartment
    }
  }
}
`;
