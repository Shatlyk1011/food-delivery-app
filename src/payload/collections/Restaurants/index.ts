import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { checkRole } from "../../access/checkRole";

const Restaurants: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (req.user) {
        if (req.user.roles?.includes("admin")) return true;

        if (req.headers.referer?.includes("/admin")) {
          return {
            relatedToUser: {
              equals: req.user.id,
            },
          };
        }
      }
      return true;
    },
    update: ({ req: { user } }) => {
      if (checkRole(["admin"], user)) {
        return true;
      } else {
        return {
          relatedToUser: {
            equals: user.id,
          },
        };
      }
    },
  },

  admin: {
    defaultColumns: ["title", "deliveryTime", "deliveryPrice", "isBlocked"],
    useAsTitle: "title",
  },

  fields: [
    {
      name: "title",
      access: {
        update: admins,
      },
      label: "Название ресторана",
      required: true,
      type: "text",
    },
    {
      name: "description",
      label: "Описание ресторана",
      type: "text",
    },
    {
      name: "address",
      label: "Адрес ресторана",
      required: true,
      type: "text",
    },
    {
      name: "deliveryTime",
      admin: {
        position: "sidebar",
      },
      defaultValue: "60",
      label: "Время доставки ",
      options: [
        {
          label: "30 - мин",
          value: "30",
        },
        {
          label: "45 - мин",
          value: "45",
        },
        {
          label: "60 - мин",
          value: "60",
        },
        {
          label: "90 - мин",
          value: "90",
        },
        {
          label: "120 - мин",
          value: "120",
        },
        {
          label: "120+ - мин",
          value: "not_today",
        },
      ],
      required: true,
      type: "select",
    },

    {
      name: "deliveryPrice",
      defaultValue: 5,
      label: "Цена доставки (в манатах)",
      required: true,
      type: "number",
      validate: (value) => {
        if (value < 0) {
          return "Цена доставки не может быть меньше 0.";
        }
        return true;
      },
    },
    {
      name: "freeAfterAmount",
      defaultValue: 150,
      label: "Бесплатно после (в манатах)",
      required: false,
      type: "number",
      validate: (value) => {
        if (value < 20) {
          return "Значение не может быть меньше 20.";
        }
        return true;
      },
    },
    //open times close times
    {
      name: "workingHours",
      fields: [
        {
          name: "openTime",
          label: "Время открытия",
          options: [
            {
              label: "07:00",
              value: "0700",
            },
            {
              label: "07:30",
              value: "0730",
            },
            {
              label: "08:00",
              value: "0800",
            },
            {
              label: "08:30",
              value: "0830",
            },
            {
              label: "09:00",
              value: "0900",
            },
            {
              label: "09:30",
              value: "0930",
            },
            {
              label: "10:00",
              value: "1000",
            },
            {
              label: "10:30",
              value: "1030",
            },
            {
              label: "11:00",
              value: "1100",
            },
            {
              label: "11:30",
              value: "1130",
            },
            {
              label: "12:00",
              value: "1200",
            },
          ],
          required: true,
          type: "select",
        },
        {
          name: "closeTime",
          label: "Время закрытия",
          options: [
            {
              label: "19:00",
              value: "1900",
            },
            {
              label: "19:30",
              value: "1930",
            },
            {
              label: "20:00",
              value: "2000",
            },
            {
              label: "20:30",
              value: "2030",
            },
            {
              label: "21:00",
              value: "2100",
            },
            {
              label: "21:30",
              value: "2130",
            },
            {
              label: "22:00",
              value: "2200",
            },
            {
              label: "22:30",
              value: "2230",
            },
            {
              label: "23:00",
              value: "2300",
            },
            {
              label: "23:30",
              value: "2330",
            },
            {
              label: "00:00",
              value: "2400",
            },
          ],
          required: true,
          type: "select",
        },
      ],
      label: "Режим работы",
      type: "group",
    },
    {
      name: "isClosed",
      defaultValue: false,
      label: "Закрыто",
      required: false,
      type: "checkbox",
    },
    {
      name: "isDelivery",
      defaultValue: false,
      label: "Доступна ли доставка?",
      required: true,
      type: "checkbox",
    },
    {
      name: "bannerImage",
      label: "Главное изображение",
      relationTo: "media",
      type: "upload",
    },
    {
      name: "categories",
      access: {
        create: admins,
        read: () => true,
      },
      hasMany: true,
      required: false,
      label: "Категории ресторана",
      relationTo: "categories",
      type: "relationship",
      filterOptions: {
        type: {
          equals: "restaurant",
        },
      },
    },
    {
      name: "dishes",
      hasMany: true,
      relationTo: "dishes",
      type: "relationship",
      label: "Блюда (доступные)",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "budgetCategory",
      access: {
        read: () => true,
        update: admins,
      },
      defaultValue: "2",
      label: "Ценовая категория",
      options: [
        {
          label: "Не дорогой",
          value: "1",
        },
        {
          label: "Средний",
          value: "2",
        },
        {
          label: "Дорогой",
          value: "3",
        },
      ],
      required: false,
      type: "radio",
    },
    {
      name: "isBlocked",
      access: {
        create: admins,
        read: () => true,
        update: admins,
      },
      defaultValue: true,
      label: "Заблокировано",
      required: false,
      type: "checkbox",
    },
    {
      name: "relatedToUser",
      access: {
        read: () => true,
        update: admins,
      },
      label: "Какой ресторан?",
      relationTo: "customers",
      required: true,
      type: "relationship",
    },
    {
      name: "cities",
      access: {
        read: admins,
        update: admins,
      },
      hasMany: true,
      label: "В каких городах есть этот ресторан?",
      relationTo: "cities",
      required: false,

      type: "relationship",
    },
  ],
  hooks: {
    beforeRead: [
      async ({ doc, req }) => {
        if (checkRole(["admin", "author"], req.user)) {
          return doc;
        }

        if (doc.isBlocked) {
          throw new Error("Errors.isBlocked");
        }

        return doc;
      },
    ],
  },
  labels: { plural: "Рестораны", singular: "Ресторан" },
  slug: "restaurants",
};

export default Restaurants;
