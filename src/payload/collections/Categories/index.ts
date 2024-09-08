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
    useAsTitle: "category",
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
      name: "category",
      type: "text",
      label: "Категория",
      required: true,
      unique: true,
    },
    {
      name: "value",
      type: "text",
      label: "Значение (value)",
      required: true,
      unique: true,
    },
    {
      name: "order",
      type: "number",
      label: "Порядок",
      required: false,
    },
    {
      name: "type",
      type: "select",
      label: "Тип (блюдо или ресторан)",
      required: true,
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
    },
  ],
  labels: { plural: "Категории", singular: "Категория" },
  slug: "categories",
  timestamps: false,
};

export default Categories;
