import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";

const Cities: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },

  admin: {
    defaultColumns: ["title", "createdAt"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
  ],
  slug: "cities",
  timestamps: false,
};

export default Cities;
