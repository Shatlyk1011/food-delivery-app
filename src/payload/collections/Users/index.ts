import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { checkRole } from "./checkRole";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import { loginAfterCreate } from "./hooks/loginAfterCreate";

const Users: CollectionConfig = {
  access: {
    admin: ({ req: { user } }) => checkRole(["admin", "author", "moderator"], user),
    create: admins,
    delete: admins,
    read: ({ req: { user } }) => checkRole(["admin", "author", "moderator"], user),
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
  hooks: {
    afterChange: [loginAfterCreate],
  },

  slug: "users",
  timestamps: true,
};

export default Users;
