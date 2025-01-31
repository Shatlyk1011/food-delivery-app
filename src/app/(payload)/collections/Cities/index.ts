import { CollectionConfig } from "payload";

import { checkRole } from "../utils/access/checkRole";
import { admins } from "../utils/access/admins";

const Cities: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (checkRole(["author", "guest"], req.user)) {
        return false;
      } else {
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
