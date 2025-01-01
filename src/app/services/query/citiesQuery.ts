export const CITIES_QUERY = `
  query Cities($limit: Int!) {
    Cities(
      limit: $limit,
      ) {
      docs {
        id
        title
      }
    }
  }
`;
