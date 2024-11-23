// import { webpackBundler } from "@payloadcms/bundler-webpack"; // bundler-import
// import { mongooseAdapter } from "@payloadcms/db-mongodb";
// // database-adapter-import

// import { lexicalEditor } from "@payloadcms/richtext-lexical";
// import path from "path";
// import { buildConfig } from "payload/config";

// import Categories from "./collections/Categories";
// import Cities from "./collections/Cities";
// import Customers from "./collections/Customers";
// import Dishes from "./collections/Dishes";
// import FeedbackAndCooperations from "./collections/FeedbackAndCooperations";
// import Media from "./collections/Media";
// import Orders from "./collections/Orders";
// import Restaurants from "./collections/Restaurants";
// import Users from "./collections/Users";

// const m = path.resolve(__dirname, "./emptyModuleMock.js");

// export default buildConfig({
//   admin: {
//     bundler: webpackBundler(), // bundler-config
//     css: path.resolve(__dirname, "payload.styles.css"),
//     user: Customers.slug,
//     webpack: (config) => ({
//       ...config,
//       resolve: {
//         ...config.resolve,
//         alias: {
//           ...config.resolve?.alias,
//           express: m,
//         },
//       },
//     }),
//   },
//   collections: [Restaurants, Orders, Dishes, Cities, Users, Customers, Media, Categories, FeedbackAndCooperations],
//   cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
//   csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ""].filter(Boolean),
//   editor: lexicalEditor({}),
//   graphQL: {
//     disablePlaygroundInProduction: false,
//     schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
//   },
//   maxDepth: 10,
//   rateLimit: {
//     max: 1000, // limit each IP per windowMs
//     trustProxy: true,
//     window: 15 * 60 * 1000, // 2 minutes
//   },
//   serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
//   typescript: {
//     outputFile: path.resolve(__dirname, "payload-types.ts"),
//   },
//   // database-adapter-config-start
//   db: mongooseAdapter({
//     url: process.env.DATABASE_URI,
//   }),
//   // database-adapter-config-end
// });

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from "./collections/Categories";
import Cities from "./collections/Cities";
import Customers from "./collections/Customers";
import Dishes from "./collections/Dishes";
import FeedbackAndCooperations from "./collections/FeedbackAndCooperations";
import Media from "./collections/Media";
import Orders from "./collections/Orders";
import Restaurants from "./collections/Restaurants";
import Users from "./collections/Users";

export default buildConfig({
  collections: [
    Restaurants,
    Orders,
    Dishes,
    Cities,
    Users,
    Customers,
    Media,
    Categories,
    FeedbackAndCooperations,
  ],

  admin: {
    bundler: webpackBundler(),
    user: Customers.slug,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
    process.env.PAYLOAD_PUBLIC_SITE_URL || "",
  ].filter(Boolean),
  csrf: [
    process.env.PAYLOAD_PUBLIC_SERVER_URL || "",
    process.env.PAYLOAD_PUBLIC_SITE_URL || "",
  ].filter(Boolean),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});