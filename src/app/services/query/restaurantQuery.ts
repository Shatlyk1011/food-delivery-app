// categories: {
//   in: { title: "all" }
// }

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
          category
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
      freeAfterAmount
      workingHours {
        openTime
        closeTime
      }
    }
  }
`;

export const CATEGORIES = `
query Categories($type: Category_type_Input!, $limit: Int!) {
  Categories(
    where: { type: { equals: $type }}, 
    limit: $limit,
    sort: "order"
      ) {
      docs {
        category
        value
      }
    }
  }
`;
