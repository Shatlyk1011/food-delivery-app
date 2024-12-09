export const FEEDBACK_OR_COOP_MUTATION = `
mutation CreateFeedbackAndCooperation($data: mutationFeedbackAndCooperationInput!) {
  createFeedbackAndCooperation (data: $data) {
    id
    type
  }
}
`;
