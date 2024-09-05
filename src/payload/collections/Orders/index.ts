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
        if (checkRole(["author"], req.user)) {
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
        {
          label: "Отказано",
          value: "rejected",
        },
      ],
      required: false,
      type: "select",
    },

    {
      name: "totalAmount",
      type: "number",
      label: "Общая сумма заказа",
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "deliveryPrice",
      label: "Стоимость доставки",
      required: false,
      type: "text",
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
      async ({ data, req, originalDoc, operation }) => {
        const { restaurantID, dishes } = data;

        if (operation === "create") {
          const now = new Date();
          const thirtyMinutesAgo = new Date(now.getTime() - 60 * 1000);

          const recentOrders = await req.payload.find({
            collection: "orders",
            where: {
              orderedByUser: { equals: req.user.id },
              createdAt: { greater_than: thirtyMinutesAgo },
            },
            limit: 0,
            depth: 0,
          });
          console.log("recentOrders", recentOrders);
          if (recentOrders.totalDocs >= 5) {
            throw new Error("Пожалуйста, подождите...");
          }
        }

        //if changes appear in admin panel, change only orderStatus, and return data
        if (checkRole(["admin", "author"], req.user)) {
          if (originalDoc.orderStatus === "delivered") {
            return originalDoc;
          }
          return data;
        }

        if (!restaurantID || !dishes || dishes.length === 0) {
          return data;
        }
        const [restaurantResult, foundDishes] = await Promise.all([
          req.payload.find({
            collection: "restaurants",
            where: { _id: { equals: restaurantID } },
          }),
          req.payload.find({
            collection: "dishes",
            where: {
              _id: { in: dishes.map((d: any) => d.id) },
              restaurant: { equals: restaurantID },
            },
          }),
        ]);

        const restaurant = restaurantResult.docs[0];
        if (!restaurant) {
          throw new Error("Что-то пошло не так. Ресторан не найден");
        }

        if (!foundDishes.docs.length) {
          throw new Error("Что-то пошло не так. Выбранные блюда не найдены.");
        }

        let totalAmount = 0;
        const findAndCountDishes = foundDishes.docs.map((dish) => {
          const quantity = dishes.find((d: any) => d.id === dish.id)?.quantity || 1;
          totalAmount += dish.price * quantity;
          return { dish: dish.id, quantity };
        });

        const deliveryPrice = totalAmount > restaurant.freeAfterAmount ? 0 : restaurant.deliveryPrice;
        data.dishes = findAndCountDishes;
        data.totalAmount = totalAmount + deliveryPrice;
        data.deliveryPrice = deliveryPrice;
        data.restaurantName = restaurant.title || "Название ресторана не найдено...";
      },
    ],
  },
};

export default Orders;
