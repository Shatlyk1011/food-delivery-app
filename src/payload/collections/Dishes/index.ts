import type { CollectionConfig } from "payload/types";

import adminAndCreatedByUser from "../../access/adminAndCreatedByUser";
import { checkRole } from "../../access/checkRole";

const Dishes: CollectionConfig = {
  access: {
    create: () => true,
    delete: adminAndCreatedByUser,
    read: ({ req }) => {
      if (req.user) {
        if (req.user.roles?.includes("admin")) return true;

        if (req.headers.referer?.includes("/admin")) {
          return adminAndCreatedByUser({ req });
        }
      }
      return true;
    },
    update: adminAndCreatedByUser,
  },

  admin: {
    defaultColumns: ["title", "price", "availableAmount", "cookTime"],
    hideAPIURL: true,
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Название блюда",
      required: true,
      type: "text",
    },
    {
      name: "description",
      label: "Описание (состав)",
      maxLength: 200,
      required: true,
      type: "textarea",
    },
    {
      name: "price",
      label: "Цена (в манатах)",
      required: true,
      type: "number",
      validate: (value) => {
        if (value < 0) {
          return "Цена блюда не может быть меньше 0.";
        }
        return true;
      },
    },

    {
      name: "gram",
      label: "Вес (в граммах)",
      required: true,
      type: "number",
      validate: (value) => {
        if (value < 0) {
          return "Вес блюда не может быть меньше 0.";
        }
        return true;
      },
    },
    {
      name: "availableAmount",
      admin: {
        position: "sidebar",
      },
      defaultValue: 30,
      label: "Доступно в наличии",
      required: false,
      type: "number",
      validate: (value) => {
        if (value < 0) {
          return "Значение не может быть меньше 0.";
        }
        return true;
      },
    },

    {
      name: "cookTime",
      defaultValue: 30,
      label: "Время приготовления (в минутах)",
      required: true,
      type: "number",
      validate: (value) => {
        if (value < 0) {
          return "Время приготовления не может быть меньше 0.";
        }
        return true;
      },
    },

    {
      name: "categories",
      access: {
        read: () => true,
        update: ({ req: { user } }) => {
          return checkRole(["admin", "author"], user);
        },
      },
      filterOptions: {
        type: {
          equals: "dish",
        },
      },
      label: "Категория блюда",
      relationTo: "categories",
      required: false,
      type: "relationship",
    },
    {
      name: "image",
      label: "Изображение блюда",
      relationTo: "media",
      required: false,
      type: "upload",
    },
    {
      name: "restaurant",
      label: "Выберите свой ресторан",
      relationTo: "restaurants",
      //can me true to let 1 dish be available in several restaurants
      // hasMany: true,
      required: true,
      type: "relationship",
    },
    {
      name: "createdBy",
      admin: {
        hidden: true,
      },
      label: "Пользователь",
      relationTo: "customers",
      type: "relationship",
    },
    {
      name: "isBlocked",
      defaultValue: false,
      label: "Заблокировано",
      required: false,
      type: "checkbox",
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (req.user && !data.createdBy) {
          data.createdBy = req.user.id;
        }
        return data;
      },
    ],
  },
  labels: { plural: "Блюда", singular: "Блюдо" },
  slug: "dishes",
  timestamps: true,
};

export default Dishes;
