// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import Categories from "./app/(payload)/collections/Categories";
import Cities from "./app/(payload)/collections/Cities";
import Customers from "./app/(payload)/collections/Customers";
import Dishes from "./app/(payload)/collections/Dishes";
import FeedbackAndCooperations from "./app/(payload)/collections/FeedbackAndCooperations";
import Media from "./app/(payload)/collections/Media";
import Orders from "./app/(payload)/collections/Orders";
import Restaurants from "./app/(payload)/collections/Restaurants";
import Users from "./app/(payload)/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Customers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cookiePrefix: "ashpez",
  collections: [Restaurants, Orders, Dishes, Cities, Users, Customers, Media, Categories, FeedbackAndCooperations],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
