import type { CollectionConfig } from "payload/types";

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
        if (req.headers.referer.includes("/admin/")) {
          return {
            restaurantID: {
              in: req.user.restaurant,
            },
          };
        }
      }
      if (checkRole(["user"], req.user)) {
        return {
          orderedByUser: {
            equals: req.user.id, // Users can only read orders they created
          },
        };
      }
      return false;
    },
    update: ({ req }) => {
      if (checkRole(["admin", "author"], req.user)) {
        return true;
      }
      return false;
    },
  },

  admin: {
    defaultColumns: ["dishes", "district", "phoneNumber", "apartment", "houseNumber", "orderStatus", "createdAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "city",
      label: "Город",
      required: false,
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "district",
      label: "Район",
      required: true,
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "apartment",
      label: "Квартира",
      required: true,
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "houseNumber",
      label: "Номер дома",
      required: true,
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "entrance",
      label: "Подъезд",
      required: false,
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "phoneNumber",
      label: "Номер телефана",
      required: true,
      type: "number",
      admin: {
        readOnly: true,
      },
    },

    {
      name: "orderStatus",
      admin: {
        position: "sidebar",
      },
      access: {
        update: ({ req: { user } }) => {
          if (checkRole(["admin", "author"], user)) {
            return true;
          }
        },
      },
      defaultValue: "pending",
      label: "Статус заказа ",
      options: [
        {
          label: "Обработка",
          value: "pending",
        },
        {
          label: "Принято",
          value: "recieved",
        },
        {
          label: "Отправлено",
          value: "sended",
        },
        {
          label: "Доставлено",
          value: "delivered",
        },
      ],
      required: false,
      type: "select",
    },
    {
      name: "isDelivery",
      label: "Доставка?",
      required: true,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      type: "checkbox",
    },

    {
      name: "totalAmount",
      type: "number",
      label: "Общая сумма заказа (с учетом доставки)",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "restaurantName",
      type: "text",
      label: "Название ресторана",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },

    {
      name: "commentToCourier",
      label: "Коментарий курьеру",
      required: false,
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "commentToRestaurant",
      label: "Коментарий ресторану",
      required: false,
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
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
      type: "array",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "restaurantID",
      label: "ID ресторана",
      required: true,
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "orderedByUser",
      label: "ID пользователя",
      required: true,
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
  labels: { plural: "Заказы", singular: "Заказ" },
  slug: "orders",
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        const { restaurantID, dishes, orderStatus } = data;
        //if changes appear in admin panel, change only orderStatus, and return data
        if (checkRole(["admin", "author"], req.user)) {
          originalDoc.orderStatus = orderStatus;
          return data;
        }
        if (!restaurantID || !dishes || dishes.length === 0) {
          return data;
        }
        const restaurant = await req.payload.find({
          collection: "restaurants",
          where: { _id: { equals: restaurantID } },
        });

        if (!restaurant.docs.length) {
          throw new Error("Что то пошло не так. Ресторан не найден");
        }

        const dishIds = dishes.map((d: any) => d.id);
        const foundDishes = await req.payload.find({
          collection: "dishes",
          where: {
            _id: { in: dishIds },
            restaurant: { equals: restaurantID },
          },
        });

        if (!dishIds.length) {
          throw new Error("Что то пошло не так. Выбранные блюда не найдены.");
        }

        const findAndCountDishes = foundDishes.docs?.map((dish) => ({
          dish: dish.id,
          quantity: dishes.find((d: any) => d.id === dish.id)?.quantity || 1,
        }));
        // ??? use this data for total amount. reduce amount of operations
        console.log("findAndCountDishes", findAndCountDishes);
        data.dishes = findAndCountDishes;

        const totalAmount = foundDishes.docs.reduce((acc, dish) => {
          const quantity = dishes.find((d) => d.id === dish.id)?.quantity || 1;
          return acc + dish.price * quantity;
        }, 0);

        data.totalAmount = totalAmount + restaurant.docs[0]?.deliveryPrice || -1;
        data.restaurantName = restaurant.docs[0]?.title || "Название ресторана не найдено...";
        return data;
      },
    ],
  },
};

export default Orders;
