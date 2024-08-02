import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import { loginAfterCreate } from "./hooks/loginAfterCreate";

const Users: CollectionConfig = {
  slug: "users",

  access: {
    admin: admins,
    create: admins,
    delete: admins,
    read: admins,
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
  hooks: {
    afterChange: [loginAfterCreate],
  },
  timestamps: true,
};

export default Users;
