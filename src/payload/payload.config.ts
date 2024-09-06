import { webpackBundler } from "@payloadcms/bundler-webpack"; // bundler-import
import { mongooseAdapter } from "@payloadcms/db-mongodb";
// database-adapter-import

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

import OrderRefetchComponent from "./components/OrdersRefetch";

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
    components: {
      beforeDashboard: [OrderRefetchComponent],
    },
    css: path.resolve(__dirname, "payload.styles.css"),
  },
  collections: [Restaurants, Orders, Dishes, Cities, Users, Customers, Media, Categories],
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
  editor: lexicalEditor({}),
  graphQL: {
    disablePlaygroundInProduction: false,
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  rateLimit: {
    max: 1000, // limit each IP per windowMs
    window: 15 * 60 * 1000, // 2 minutes
    trustProxy: true,
  },
  maxDepth: 10,
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
