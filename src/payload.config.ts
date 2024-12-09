// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import Categories from "./collections/Categories";
import Cities from "./collections/Cities";
import Customers from "./collections/Customers";
import Dishes from "./collections/Dishes";
import FeedbackAndCooperations from "./collections/FeedbackAndCooperations";
import Media from "./collections/Media";
import Orders from "./collections/Orders";
import Restaurants from "./collections/Restaurants";
import Users from "./collections/Users";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Customers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
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
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
