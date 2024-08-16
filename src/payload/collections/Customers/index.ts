import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { checkRole } from "../../access/checkRole";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

const Customers: CollectionConfig = {
  access: {
    admin: () => true,
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (checkRole(["admin"], req.user)) {
        return true;
      }
      if (req.user?.isBlocked) {
        return false;
      }

      return {
        id: {
          equals: req.user?.id,
        },
      };
    },
    update: admins,
  },

  admin: {
    defaultColumns: ["name", "phone", "roles"],
    useAsTitle: "name",
  },

  auth: {
    depth: 0,
    tokenExpiration: 604800,
    maxLoginAttempts: 20,
  },

  fields: [
    {
      name: "name",
      label: "Название ресторана",
      type: "text",
    },
    {
      name: "phone",
      label: "Номер телефона",
      required: false,
      type: "text",
      validate: (value) => {
        if (!value || value.length < 8 || value.length > 8) {
          return "payloadPhoneValidation";
        }
        return true;
      },
    },

    {
      name: "restaurant",
      admin: {
        hidden: true,
      },
      hasMany: true,
      label: "Ресторан",
      relationTo: "restaurants",
      type: "relationship",
    },

    {
      name: "orders",
      required: false,
      access: {
        read: admins,
        update: admins,
      },
      hasMany: true,
      label: "Заказы",
      relationTo: "orders",
      type: "relationship",
    },

    {
      name: "isBlocked",
      access: {
        read: admins,
        update: admins,
      },
      defaultValue: false,
      label: "Заблокирован",
      required: false,
      type: "checkbox",
    },

    {
      name: "roles",
      defaultValue: "author",
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: "Админ",
          value: "admin",
        },
        {
          label: "Ресторатор",
          value: "author",
        },
        // {
        //   label: "moderator",
        //   value: "moderator",
        // },
      ],
      type: "select",
    },
  ],

  labels: { plural: "Владельцы ресторанов", singular: "Владелец ресторана" },
  slug: "customers",
  timestamps: true,
};

export default Customers;
