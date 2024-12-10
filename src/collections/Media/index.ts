import type { CollectionConfig } from "payload";

import path from "path";

import adminAndCreatedByUser from "../utils/access/adminAndCreatedByUser";
import { admins } from "../utils/access/admins";
import adminsAndUser from "../utils/access/adminsAndUser";

const Media: CollectionConfig = {
  access: {
    create: adminsAndUser,
    delete: admins,
    read: ({ req }) => {
      if (req.user) {
        if (req.url?.includes('/admin')) {
          return adminAndCreatedByUser({ req })
        }
      }
      return true;
    },
    update: adminsAndUser,
  },
  admin: {
    defaultColumns: ["title", "createdBy", "createdAt"],
  },
  fields: [
    {
      name: "alt",
      label: "Image alt text",
      required: true,
      type: "text",
    },
    {
      name: "createdBy",
      admin: {
        hidden: true,
      },
      label: "Users",
      relationTo: "customers",
      type: "relationship",
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (req.user && data && !data.createdBy) {
          data.createdBy = req.user.id
        }
        return data;
      },
    ],
  },
  labels: { plural: "Images", singular: "Image" },
  slug: "media",

  upload: {
    formatOptions: {
      format: "webp",
      options: {
        quality: 60,
      },
    },
    mimeTypes: ["image/*"],
    // staticDir: path.resolve(__dirname, "../../../media"),
    // staticURL: "/media",
  },
};

export default Media;
