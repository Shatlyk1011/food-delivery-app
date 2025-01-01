import type { CollectionConfig } from 'payload'

import { admins } from "../utils/access/admins";
import { checkRole } from "../utils/access/checkRole";

import { CLOSE_HOURS, DELIVERY_TIMES, OPEN_HOURS } from "./data";

const Restaurants: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: ({ req }) => {
      if (req.user) {
        if (checkRole(["admin", "guest"], req.user)) {
          return true;
        }

        // We're in the admin panel
        if (req?.payloadAPI) {
          return {
            relatedToUser: {
              equals: req.user.id,
            },
          };
        }
      }
      return true;
    },
    update: ({ req: { user } }) => {
      if (user && checkRole(["admin"], user)) {
        return true;
      } else {
        return {
          relatedToUser: {
            equals: user?.id,
          },
        };
      }
    },
  },

  admin: {
    defaultColumns: ["title", "deliveryTime", "deliveryPrice", "isBlocked"],
    useAsTitle: "title",
  },

  fields: [
    {
      name: "title",
      label: "Restaurant name",
      required: true,
      access: {
        update: admins,
      },
      type: "text",
    },
    {
      name: "description",
      label: "Restaurant description",
      type: "text",
    },
    {
      name: "address",
      label: "Restaurant address",
      required: true,
      type: "text",
    },
    {
      name: "deliveryTime",
      admin: {
        position: "sidebar",
      },
      defaultValue: "60",
      label: "Delivery time",
      options: DELIVERY_TIMES,
      required: true,
      type: "select",
    },

    {
      name: "deliveryPrice",
      defaultValue: 5,
      label: "Delivery price (in usd)",
      required: true,
      type: "number",
      validate: (value: any) => {
        if (value < 0) {
          return "Shipping price cannot be less than 0.";
        }
        return true;
      },
    },
    {
      name: "freeAfterAmount",
      defaultValue: 150,
      label: "Free after amount (in usd)",
      required: false,
      type: "number",
    },
    //open times close times
    {
      name: "workingHours",
      fields: [
        {
          name: "openTime",
          label: "Open time",
          options: OPEN_HOURS,
          required: true,
          type: "select",
        },
        {
          name: "closeTime",
          label: "Close time",
          options: CLOSE_HOURS,
          required: true,
          type: "select",
        },
      ],
      label: "Working hours",
      type: "group",
    },
    {
      name: "isClosed",
      defaultValue: false,
      label: "Is closed?",
      required: false,
      type: "checkbox",
    },
    {
      name: "isDelivery",
      defaultValue: false,
      label: "Is delivery available?",
      required: true,
      type: "checkbox",
    },
    {
      name: "bannerImage",
      label: "Main image (banner)",
      relationTo: "media",
      type: "upload",
    },
    {
      name: "categories",
      access: {
        create: ({ req }) => checkRole(["admin"], req.user),
        read: () => true,
      },
      hasMany: true,
      required: false,
      label: "Restaurant categories",
      relationTo: "categories",
      type: "relationship",
      filterOptions: {
        type: {
          equals: "restaurant",
        },
      },
    },
    {
      name: "dishes",
      hasMany: true,
      relationTo: "dishes",
      type: "relationship",
      label: "Dishes",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "budgetCategory",
      access: {
        read: () => true,
        update: ({ req }) => checkRole(["admin"], req.user),
      },
      defaultValue: "2",
      label: "Budget category",
      options: [
        {
          label: "Cheap",
          value: "1",
        },
        {
          label: "Average",
          value: "2",
        },
        {
          label: "Expensive",
          value: "3",
        },
      ],
      required: false,
      type: "radio",
    },
    {
      name: "isBlocked",
      access: {
        create: ({ req }) => checkRole(["admin"], req.user),
        read: () => true,
        update: ({ req }) => checkRole(["admin"], req.user),
      },
      defaultValue: true,
      label: "Is blocked?",
      required: false,
      type: "checkbox",
    },
    {
      name: "relatedToUser",
      access: {
        read: () => true,
        update: ({ req }) => checkRole(["admin"], req.user),
      },
      label: "Which restaurant?",
      relationTo: "customers",
      required: true,
      type: "relationship",
    },
    {
      name: "cities",
      access: {
        read: ({ req }) => checkRole(["admin"], req.user),
        update: ({ req }) => checkRole(["admin"], req.user),
      },
      hasMany: true,
      label: "In which cities is this restaurant located?",
      relationTo: "cities",
      required: false,

      type: "relationship",
    },
  ],
  hooks: {
    beforeRead: [
      async ({ doc, req }) => {
        if (checkRole(["admin", "author"], req.user)) {
          return doc;
        }

        // if (doc.isBlocked) {
        //   throw new Error("Errors.isBlocked");
        // }

        return doc;
      },
    ],
  },
  labels: { plural: "Restaurants", singular: "Restaurant" },
  slug: "restaurants",
};

export default Restaurants
