import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";

const Users: CollectionConfig = {
  access: {
    admin: () => false,
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },

  admin: {
    defaultColumns: ["name", "role", "email"],
    useAsTitle: "name",
  },

  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
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
        {
          name: "phoneNumber",
          label: "Номер телефана",
          required: true,
          type: "number",
        },
      ],
      label: "Адреса",
      required: false,
      type: "array",
    },
  ],

  slug: "users",
  timestamps: true,
};

export default Users;
