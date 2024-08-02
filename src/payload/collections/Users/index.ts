import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { checkRole } from "./checkRole";
import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";
import { loginAfterCreate } from "./hooks/loginAfterCreate";

const Users: CollectionConfig = {
  slug: "users",

  access: {
    admin: ({ req: { user } }) => checkRole(["admin"], user),
    create: () => false,
    delete: () => false,
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
      // override default email field to add a custom validate function to prevent users from changing the login email
      name: "email",
      type: "email",
    },
    {
      name: "roles",
      access: {
        create: admins,
        read: admins,
        update: admins,
      },
      defaultValue: ["user"],
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
          label: "user",
          value: "user",
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
