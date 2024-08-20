import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";
import { checkRole } from "../../access/checkRole";

const Categories: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },

  admin: {
    defaultColumns: ["title"],
    useAsTitle: "title",
    hidden: ({ user }: any) => {
      if (checkRole(["admin"], user)) {
        return false;
      }
      return true;
    },
  },

  //realise options with label
  fields: [
    {
      name: "title",
      label: "Категория",
      type: "text",
    },
  ],
  labels: { plural: "Категории", singular: "Категория" },
  slug: "categories",
  timestamps: false,
};

export default Categories;
