import type { CollectionConfig } from "payload";

import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import { checkRole } from "../../access/checkRole";
import { admins } from "../../access/admins";

const Customers: CollectionConfig = {
  access: {
    admin: () => true,
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (checkRole(["admin", "guest"], req.user)) {
        return true;
      }
      // @ts-expect-error
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
    maxLoginAttempts: 20,
    tokenExpiration: 604800,
  },

  fields: [
    {
      name: "name",
      label: "Username",
      type: "text",
    },
    {
      name: "phone",
      label: "Phone number",
      required: false,
      type: "text",
    },

    {
      name: "restaurant",
      access: {
        read: () => true,
        update: admins,
      },
      hasMany: true,
      label: "Restaurant",
      relationTo: "restaurants",
      type: "relationship",
    },

    {
      name: "isBlocked",
      access: {
        read: admins,
        update: admins,
      },
      defaultValue: false,
      label: "Is blocked?",
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
          label: "Admin",
          value: "admin",
        },
        {
          label: "Author",
          value: "author",
        },
        {
          label: "Guest",
          value: "guest",
        },
      ],
      type: "select",
    },
  ],

  labels: { plural: "Customers", singular: "Customer" },
  slug: "customers",
  timestamps: true,
};

export default Customers;
