import type { CollectionConfig } from "payload/types";

import { checkRole } from "@/payload/access/checkRole";
import { admins } from "../../access/admins";

const Cities: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (checkRole(["admin", "guest"], req.user)) {
        return true;
      }
    },
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
