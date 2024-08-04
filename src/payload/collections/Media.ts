import type { CollectionConfig } from "payload/types";

import path from "path";

import { admins } from "../access/admins";
import adminAndCreatedByUser from "./Users/access/adminAndCreatedByUser";
import adminsAndUser from "./Users/access/adminsAndUser";

const Media: CollectionConfig = {
  access: {
    create: adminsAndUser,
    delete: admins,
    read: adminAndCreatedByUser,
    update: admins,
  },
  admin: {
    defaultColumns: ["title", "createdBy", "createdAt"],
  },
  fields: [
    {
      name: "alt",
      label: "Альтернативный текст",
      required: true,
      type: "text",
    },
    {
      name: "createdBy",
      admin: {
        position: "sidebar",
      },
      label: "Пользователь",
      relationTo: "users",
      type: "relationship",
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (req.user && !data.createdBy) {
          data.createdBy = req.user.id;
        }
        return data;
      },
    ],
  },
  slug: "media",

  upload: {
    formatOptions: {
      format: "webp",
      options: {
        quality: 70,
      },
    },
    mimeTypes: ["image/*"],
    staticDir: path.resolve(__dirname, "../../../media"),
    staticURL: "/media",
  },
};

export default Media;
