import type { CollectionConfig } from "payload/types";

import { LinkFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";

const Media: CollectionConfig = {
  slug: "media",

  access: {
    create: () => false,
    delete: () => false,
    read: () => true,
    update: () => false,
  },
  admin: {
    description: "Creating, updating, and deleting media is disabled for this demo.",
  },
  fields: [
    {
      name: "alt",
      required: true,
      type: "text",
    },
    {
      name: "caption",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [LinkFeature({})],
      }),
      type: "richText",
    },
  ],
  upload: {
    staticDir: path.resolve(__dirname, "../../../media"),
  },
};

export default Media;
