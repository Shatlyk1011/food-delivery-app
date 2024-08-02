import { admins } from "../../access/admins";
import type { CollectionConfig } from "payload/types";

const Cities: CollectionConfig = {
  slug: "cities",

  access: {
    create: admins,
    delete: admins,
    read: admins,
    update: admins,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "createdAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
  ],
};

export default Cities;
