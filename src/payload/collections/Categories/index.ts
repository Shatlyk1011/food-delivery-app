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
    defaultColumns: ["category", "value", "type"],
    hidden: ({ user }: any) => {
      if (checkRole(["admin"], user)) {
        return false;
      }
      return true;
    },
    useAsTitle: "category",
  },

  //realise options with label
  fields: [
    {
      name: "category",
      label: "Категория",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "value",
      label: "Значение (value)",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "order",
      label: "Порядок",
      required: false,
      type: "number",
    },
    {
      name: "type",
      label: "Тип (блюдо или ресторан)",
      options: [
        {
          label: "Блюдо",
          value: "dish",
        },
        {
          label: "Ресторан",
          value: "restaurant",
        },
      ],
      required: true,
      type: "select",
    },
  ],
  labels: { plural: "Категории", singular: "Категория" },
  slug: "categories",
  timestamps: false,
};

export default Categories;
