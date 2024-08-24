import type { CollectionConfig } from "payload/types";

import adminAndCreatedByUser from "../../access/adminAndCreatedByUser";
import { admins } from "../../access/admins";
import { checkRole } from "../../access/checkRole";

const Orders: CollectionConfig = {
  access: {
    create: ({ req: { user } }) => checkRole(["user"], user),
    // create: () => true,
    delete: admins,
    read: ({ req }) => {
      if (req.user) {
        if (checkRole(["admin"], req.user)) {
          return true;
        }
        //IT WORKS: WHEN creating order, include restaurant id as well
        if (req.headers.referer.includes("/admin/")) {
          return {
            restaurantID: {
              in: req.user.restaurant,
            },
          };
        }
      }

      return false;
    },
    update: () => false,
  },

  admin: {
    defaultColumns: ["dishes", "district", "phoneNumber", "apartment", "houseNumber", "createdAt"],
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
      admin: {
        position: "sidebar",
      },
      type: "checkbox",
    },

    {
      name: "totalAmount",
      type: "number",
      label: "Общая сумма заказа (с учетом доставки)",
      admin: {
        position: "sidebar",
        readOnly: true, // Makes it read-only in the admin panel
      },
    },
    {
      name: "dishes",
      fields: [
        {
          name: "dish",
          label: "Блюдо",
          relationTo: "dishes",
          type: "relationship",
        },
        {
          name: "quantity",
          type: "number",
        },
      ],
      label: "Заказ",
      required: true,
      type: "array",
    },
  ],
  labels: { plural: "Заказы", singular: "Заказ" },
  slug: "orders",
  timestamps: true,
  hooks: {
    // REVIEW REQUIRED
    beforeChange: [
      async ({ data, req }) => {
        const { restaurantID, dishes } = data;
        let totalAmount = 0;
        if (restaurantID && dishes && dishes.length > 0) {
          const dishIds = dishes.map((d: any) => d.id);
          // Find dishes in the current restaurant's dishes collection
          const foundDishes = await req.payload.find({
            collection: "dishes",
            where: {
              _id: {
                in: dishIds,
              },
              restaurant: {
                equals: restaurantID,
              },
            },
          });
          const restaurant = await req.payload.find({
            collection: "restaurants",
            where: {
              _id: {
                equals: restaurantID,
              },
            },
          });
          if (!restaurant.docs.length) {
            throw Error("Что то пошло не так");
          }
          data.dishes = foundDishes.docs?.map((dish) => ({
            dish: dish.id,
            quantity: dishes.find((d: any) => d.id === dish.id)?.quantity || 1,
          }));

          totalAmount = foundDishes.docs.reduce((acc, dish) => {
            const orderDish = dishes.find((d) => d.id === dish.id);
            const quantity = orderDish?.quantity || 1;
            return acc + dish.price * quantity;
          }, 0);
          data.totalAmount = totalAmount + restaurant.docs[0]?.deliveryPrice;
        }

        return data;
      },
    ],
  },
};

export default Orders;
