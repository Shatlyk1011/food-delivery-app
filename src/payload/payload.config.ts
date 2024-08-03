import { webpackBundler } from "@payloadcms/bundler-webpack"; // bundler-import
import { mongooseAdapter } from "@payloadcms/db-mongodb"; // database-adapter-import

import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload/config";

import Cities from "./collections/Cities";
import Media from "./collections/Media";
import Restaurants from "./collections/Restaurants";
import Users from "./collections/Users";

const m = path.resolve(__dirname, "./emptyModuleMock.js");

export default buildConfig({
  admin: {
    // autoLogin: {
    //   email: "demo@payloadcms.com",
    //   password: "demo",
    //   prefillOnly: true,
    // },

    bundler: webpackBundler(), // bundler-config
    user: Users.slug,
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
  collections: [Restaurants, Users, Media, Cities],
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
  // database-adapter-config-end
});
