import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { checkRole } from "../../access/checkRole";

const Users: CollectionConfig = {
  access: {
    admin: () => false,
    create: () => true,
    delete: admins,
    read: ({ req: { user } }) => {
      if (checkRole(["admin"], user)) {
        return true;
      }
      if (checkRole(["user"], user)) {
        return {
          id: {
            equals: user?.id,
          },
        };
      }
      return false;
    },
    update: ({ req: { user } }) => {
      if (checkRole(["user"], user)) {
        return true;
      }
      return false;
    },
  },

  admin: {
    defaultColumns: ["name", "email"],
    useAsTitle: "name",
  },

  auth: {
    depth: 0,
    tokenExpiration: 604800,
    verify: false,
    maxLoginAttempts: 10,
  },
  fields: [
    {
      name: "name",
      label: "Имя пользователя",
      required: true,
      type: "text",
    },

    {
      name: "phone",
      label: "Номер телефона",
      required: true,
      type: "text",
      validate: (value) => {
        if (!value || value.length < 8 || value.length > 8) {
          return "payloadPhoneValidation";
        }
        return true;
      },
    },
    {
      name: "addresses",
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
      ],
      label: "Адреса",
      required: false,
      type: "array",
    },

    {
      name: "roles",
      defaultValue: "user",
      hasMany: true,
      options: [
        {
          label: "Пользователь",
          value: "user",
        },
      ],
      type: "select",
    },
  ],
  labels: { plural: "Пользователи", singular: "Пользователь" },
  slug: "users",
  timestamps: true,
};

export default Users;
