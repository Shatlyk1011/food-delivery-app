import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import path from "path";

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
  editor: lexicalEditor({}),
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
