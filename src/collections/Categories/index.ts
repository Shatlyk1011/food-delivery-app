
import { CollectionConfig } from "payload";
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
      label: "Categories",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "value",
      label: "Value",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "order",
      label: "Order",
      required: false,
      type: "number",
    },
    {
      name: "type",
      label: "Type",
      options: [
        {
          label: "Dish",
          value: "dish",
        },
        {
          label: "Restaurant",
          value: "restaurant",
        },
      ],
      required: true,
      type: "select",
    },
  ],
  labels: { plural: "Categories", singular: "Category" },
  slug: "categories",
  timestamps: false,
};

export default Categories;
