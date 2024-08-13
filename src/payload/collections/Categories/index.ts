import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";

const Categories: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (req.user) {
        if (req.user.roles.includes("admin")) return true;

        if (req.headers.referer?.includes("/admin")) {
          return false;
        }
      }
      return true;
    },
    update: admins,
  },

  admin: {
    defaultColumns: ["title"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Категория",
      type: "text",
    },
  ],
  slug: "categories",
  labels: { singular: "Категории", plural: "Категории" },
  timestamps: false,
};

export default Categories;
