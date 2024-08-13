import type { CollectionConfig } from "payload/types";

import path from "path";

import adminAndCreatedByUser from "../access/adminAndCreatedByUser";
import { admins } from "../access/admins";
import adminsAndUser from "../access/adminsAndUser";

const Media: CollectionConfig = {
  access: {
    create: adminsAndUser,
    delete: admins,
    read: adminAndCreatedByUser,
    update: adminsAndUser,
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
        hidden: true,
      },
      label: "Пользователь",
      relationTo: "customers",
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
        quality: 60,
      },
    },
    mimeTypes: ["image/*"],
    staticDir: path.resolve(__dirname, "../../../media"),
    staticURL: "/media",
  },
};

export default Media;
