import type { CollectionConfig } from "payload";
import path from "path";

import adminAndCreatedByUser from "../utils/access/adminAndCreatedByUser";
import { admins } from "../utils/access/admins";
import adminsAndUser from "../utils/access/adminsAndUser";
import { checkRole } from "../utils/access/checkRole";

const Media: CollectionConfig = {
  access: {
    create: adminsAndUser,
    delete: admins,
    read: ({ req }) => {
      if (req.user) {
        // We're in the admin panel
        if (checkRole(["author"], req.user)) {
          //fix `adminAndCreatedByUser` - does not work as expected
          return adminAndCreatedByUser({ req });
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
      defaultValue: "alt text sample",
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
          data.createdBy = req.user.id;
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
    staticDir: path.resolve(__dirname, "../../../../../public/api/media/file/"),
    // staticURL: "/media",
  },
};

export default Media;
