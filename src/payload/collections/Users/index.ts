import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

const Users: CollectionConfig = {
  access: {
    admin: () => true,
    create: admins,
    delete: admins,
    read: ({ req: { user } }) => {
      if (user) {
        if (user.roles.includes("admin")) {
          return true;
        }
        return {
          id: {
            equals: user.id || null,
          },
        };
      }
    },
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
      name: "restaurant",
      access: {
        create: admins,
        read: () => true,
        update: () => true,
      },
      relationTo: "restaurants",
      type: "relationship",
    },

    {
      name: "roles",
      defaultValue: ["author"],
      hasMany: true,
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: "admin",
          value: "admin",
        },
        {
          label: "author",
          value: "author",
        },
        {
          label: "moderator",
          value: "moderator",
        },
      ],
      type: "select",
    },
  ],

  slug: "users",
  timestamps: true,
};

export default Users;
