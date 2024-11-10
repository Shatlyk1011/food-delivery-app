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
  labels: { plural: "Cities", singular: "City" },
  slug: "cities",
  timestamps: false,
};

export default Cities;
