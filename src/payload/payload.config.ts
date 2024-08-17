import { webpackBundler } from "@payloadcms/bundler-webpack"; // bundler-import
import { mongooseAdapter } from "@payloadcms/db-mongodb"; // database-adapter-import

import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload/config";

import Cities from "./collections/Cities";
import Customers from "./collections/Customers";
import Dishes from "./collections/Dishes";
import Media from "./collections/Media";
import Orders from "./collections/Orders";
import Restaurants from "./collections/Restaurants";
import Users from "./collections/Users";
import Categories from "./collections/Categories";

const m = path.resolve(__dirname, "./emptyModuleMock.js");

export default buildConfig({
  admin: {
    bundler: webpackBundler(), // bundler-config
    user: Customers.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          express: m,
        },
      },
    }),
  },
  collections: [Restaurants, Orders, Media, Cities, Users, Customers, Categories, Dishes],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  editor: lexicalEditor({}),
  graphQL: {
    disablePlaygroundInProduction: false,
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  rateLimit: {
    max: 10000, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  localization: {
    defaultLocale: "ru",
    locales: ["ru", "tk"],
    fallback: false,
  },
  // database-adapter-config-end
});
