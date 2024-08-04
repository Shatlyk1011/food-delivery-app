import type { CollectionConfig } from "payload/types";

import path from "path";

import { admins } from "../access/admins";

const Media: CollectionConfig = {
  access: {
    create: ({ req: { user } }) => !!user,
    delete: admins,
    read: ({ req: { user } }) => {
      if (user) {
        if (user.roles.includes("admin")) {
          return true;
        }
        return {
          createdBy: {
            equals: user.id || null,
          },
        };
      }
      return false;
    },
    update: admins,
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
