const USER_INFO = `
  id
  name
  phone
  addresses {
    district
    houseNumber
    apartment
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
