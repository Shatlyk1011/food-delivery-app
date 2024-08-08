import type { CollectionConfig } from "payload/types";

import adminAndCreatedByUser from "../../access/adminAndCreatedByUser";
import { admins } from "../../access/admins";
import { checkRole } from "../../access/checkRole";

const Orders: CollectionConfig = {
  access: {
    create: () => true,
    delete: admins,
    read: ({ req }) => {
      console.log("userrr", req.user);
      if (req.user) {
        if (checkRole(["admin"], req.user)) {
          return true;
        }
        //IT WORKS: WHEN creating order, include restaurant id as well
        if (req.headers.referer.includes("/admin/collections/orders")) {
          return {
            restaurantID: {
              in: "req.user.restaurant",
            },
          };
        }
      }

      return false;
    },
    update: adminAndCreatedByUser,
  },

  auth: {
    depth: 1,
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
      type: "text",
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
  ],
  slug: "orders",
  timestamps: true,
};

export default Orders;
