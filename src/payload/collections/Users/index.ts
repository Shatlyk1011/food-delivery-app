import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import adminsAndUser from "./access/adminsAndUser";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

const Users: CollectionConfig = {
  access: {
    admin: () => true,
    create: admins,
    delete: admins,
    read: adminsAndUser,
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
