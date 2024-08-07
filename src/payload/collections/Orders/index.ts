import type { CollectionConfig } from "payload/types";

import adminAndCreatedByUser from "../../access/adminAndCreatedByUser";
import { admins } from "../../access/admins";
import { checkRole } from "../../access/checkRole";

const Orders: CollectionConfig = {
  access: {
    create: () => true,
    delete: admins,
    read: async ({ req: { user } }) => {
      if (user) {
        if (checkRole(["admin"], user)) {
          return true;
        }
      }

      return false;
    },
    update: adminAndCreatedByUser,
  },

  admin: {
    defaultColumns: ["title", "price", "availableAmount", "cookTime"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "city",
      label: "Город",
      required: false,
      type: "text",
    },
    {
      name: "district",
      label: "Район",
      required: true,
      type: "text",
    },
    {
      name: "apartment",
      label: "Квартира",
      required: true,
      type: "text",
    },
    {
      name: "houseNumber",
      label: "Номер дома",
      required: true,
      type: "text",
    },
    {
      name: "entrance",
      label: "Подъезд",
      required: false,
      type: "text",
    },
    {
      name: "phoneNumber",
      label: "Номер телефана",
      required: true,
      type: "number",
    },
    {
      name: "commentToCourier",
      label: "Коментарий курьеру",
      required: false,
      type: "text",
    },
    {
      name: "commentToRestaurant",
      label: "Коментарий ресторану",
      required: false,
      type: "text",
    },

    {
      name: "restaurantID",
      label: "ID ресторана",
      required: true,
      type: "relationship",
      relationTo: "restaurants",
    },
    {
      name: "isDelivery",
      label: "Доставка?",
      required: true,
      type: "checkbox",
    },
    {
      name: "dishes",
      label: "Заказ",
      required: true,
      type: "array",
      fields: [
        {
          name: "dish",
          label: "Блюдо",
          type: "relationship",
          relationTo: "dishes",
        },
        {
          name: "quantity",
          type: "number",
        },
      ],
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, previousDoc }) => {
        console.log("");
        const user = req.user;
        console.log("previousDoc", previousDoc);

        if (user) {
          const userRestaurants = user.restaurants;

          // Check if the order's restaurant is in the user's restaurant list
          if (userRestaurants.includes(doc.restaurant)) {
            // Perform any actions or validations needed
            console.log(`Order ${doc.id} is associated with the user's restaurant.`);
          } else {
            console.log(`Order ${doc.id} is NOT associated with the user's restaurant.`);
          }
        }
      },
    ],
  },
  slug: "orders",
  timestamps: true,
};

export default Orders;
