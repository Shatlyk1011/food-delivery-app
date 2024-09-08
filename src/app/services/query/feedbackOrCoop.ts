export const FEEDBACK_OR_COOP_MUTATION = `
mutation CreateFeedbackAndCooperation($data: mutationFeedbackAndCooperationInput!) {
  createFeedbackAndCooperation ($data) {
    id
    phone
    addresses {
      district,
      houseNumber
      apartment
    }
  }
}
`;
