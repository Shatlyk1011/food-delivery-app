import type { CollectionConfig } from 'payload'

import adminAndCreatedByUser from "../utils/access/adminAndCreatedByUser";

import { checkRole } from "../utils/access/checkRole";

const Dishes: CollectionConfig = {
  access: {
    create: () => true,
    delete: adminAndCreatedByUser,
    read: ({ req }) => {
      if (req.user) {
        if (checkRole(["admin", "guest"], req.user)) return true;

        if (checkRole(["author"], req.user)) {
          return adminAndCreatedByUser({ req });
        }
      }
      return true;
    },
    update: adminAndCreatedByUser,
  },

  admin: {
    defaultColumns: ["title", "price", "availableAmount", "cookTime"],
    hideAPIURL: true,
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Dish name",
      required: true,
      type: "text",
    },
    {
      name: "description",
      label: "Description (compounds)",
      maxLength: 200,
      required: true,
      type: "textarea",
    },
    {
      name: "price",
      label: "Price (usd)",
      required: true,
      type: "number",
      validate: (value: any) => {
        if (value < 0) {
          return "The price of a dish cannot be less than 0.";
        }
        return true;
      },
    },

    {
      name: "gram",
      label: "weight of the dish (gram)",
      required: true,
      type: "number",
      validate: (value: any) => {
        if (value < 0) {
          return "The weight of a dish cannot be less than 0.";
        }
        return true;
      },
    },
    {
      name: "availableAmount",
      admin: {
        position: "sidebar",
      },
      defaultValue: 10,
      label: "Available amount",
      required: false,
      type: "number",
      validate: (value: any) => {
        if (value < 0) {
          return "The value cannot be less than 0.";
        }
        return true;
      },
    },

    {
      name: "cookTime",
      defaultValue: 30,
      label: "Cooking time (in minutes)",
      required: true,
      type: "number",
      validate: (value: any) => {
        if (value < 0) {
          return "Cooking time cannot be less than 0.";
        }
        return true;
      },
    },

    {
      name: "categories",
      access: {
        read: () => true,
        update: ({ req: { user } }) => {
          return checkRole(["admin", "author"], user);
        },
      },
      filterOptions: {
        type: {
          equals: "dish",
        },
      },
      label: "Category of dish",
      relationTo: "categories",
      required: false,
      type: "relationship",
    },
    {
      name: "image",
      label: "Image of the dish",
      relationTo: "media",
      required: false,
      type: "upload",
    },
    {
      name: "restaurant",
      label: "Choose your restaurant",
      relationTo: "restaurants",
      required: true,
      type: "relationship",
    },
    {
      name: "createdBy",
      admin: {
        hidden: true,
      },
      label: "User",
      relationTo: "customers",
      type: "relationship",
    },
    {
      name: "isBlocked",
      defaultValue: false,
      label: "Is blocked?",
      required: false,
      type: "checkbox",
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (req.user && data && !data.createdBy) {
          data.createdBy = req.user.id;
        }
        return data;
      },
    ],
  },
  labels: { plural: "Dishes", singular: "Dish" },
  slug: "dishes",
  timestamps: true,
};

export default Dishes
