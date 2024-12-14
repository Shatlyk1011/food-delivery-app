import type { CollectionConfig } from 'payload'

import { admins } from "../utils/access/admins";
import { checkRole } from "../utils/access/checkRole";

const Orders: CollectionConfig = {
  access: {
    create: ({ req: { user } }) => checkRole(['user'], user),
    delete: admins,
    read: ({ req }): any => {
      if (!req.user) return false;
      if (req.user) {
        if (checkRole(['admin', 'guest'], req.user)) {
          return true
        }
        if (checkRole(['author'], req.user)) {
          return {
            restaurantID: {
              // @ts-expect-error
              in: req.user.restaurant,
            },
          }
        }
      }
      if (checkRole(['user'], req.user)) {
        return {
          orderedByUser: {
            equals: req.user.id,
          },
        }
      }
      return false
    },
    update: ({ req }) => {
      if (checkRole(['admin', 'author'], req.user)) {
        return true
      }
      return false
    },
  },

  admin: {
    defaultColumns: [
      'dishes',
      'district',
      'phoneNumber',
      'apartment',
      'houseNumber',
      'orderStatus',
      'createdAt',
    ],
    useAsTitle: 'id',
  },
  fields: [
    {
      name: 'city',
      label: 'City',
      required: false,
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'district',
      label: 'District',
      required: true,
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'apartment',
      label: 'Apartment',
      required: true,
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'houseNumber',
      label: 'House number',
      required: true,
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'entrance',
      label: 'Entrance',
      required: false,
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone number',
      required: true,
      type: 'number',
      admin: {
        readOnly: true,
      },
    },

    {
      name: 'orderStatus',
      admin: {
        position: 'sidebar',
      },
      access: {
        update: ({ req: { user } }) => {
          if (checkRole(['admin', 'author'], user)) {
            return true
          }
          return false
        },
      },
      defaultValue: 'pending',
      label: 'Status ',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Recieved',
          value: 'recieved',
        },
        {
          label: 'Sended',
          value: 'sended',
        },
        {
          label: 'Delivered',
          value: 'delivered',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      required: false,
      type: 'select',
    },

    {
      name: 'totalAmount',
      type: 'number',
      label: 'Total amount',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'deliveryPrice',
      label: 'Delivery price',
      required: false,
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'restaurantName',
      type: 'text',
      label: 'Restaurant name',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'commentToCourier',
      label: 'Comment to courier',
      required: false,
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'commentToRestaurant',
      label: 'Comment to restaurant',
      required: false,
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'isDelivery',
      label: 'Is delivery available? ',
      required: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      type: 'checkbox',
    },
    {
      name: 'dishes',
      fields: [
        {
          name: 'dish',
          label: 'Dish',
          relationTo: 'dishes',
          type: 'relationship',
        },
        {
          name: 'quantity',
          type: 'number',
        },
      ],
      label: 'Заказ',
      type: 'array',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'restaurantID',
      label: 'Restaurant ID ',
      required: true,
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'orderedByUser',
      label: 'User ID',
      required: true,
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
  labels: { plural: 'Orders', singular: 'Order' },
  slug: 'orders',
  timestamps: true,
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc, operation }) => {
        const { restaurantID, dishes } = data

        if (operation === 'create') {
          const now = new Date()
          const hourAgo = new Date(now.getTime() - 60 * 1000)

          const recentOrders = await req.payload.find({
            collection: "orders",
            where: {
              orderedByUser: { equals: req.user?.id },
              createdAt: { greater_than: hourAgo },
            },
            limit: 0,
            depth: 0,
          });
          // user cannot order more than 3 orders per hour
          if (recentOrders.totalDocs >= 3) {
            throw new Error('You are ordering to much. Please wait...')
          }
        }

        //if changes appear in admin panel, change only orderStatus, and return data
        if (checkRole(['author'], req.user)) {
          if (originalDoc.orderStatus === 'delivered') {
            return originalDoc
          }
          return data
        }

        if (!restaurantID || !dishes || dishes.length === 0) {
          return data
        }
        const [restaurantResult, foundDishes] = await Promise.all([
          req.payload.find({
            collection: 'restaurants',
            where: { _id: { equals: restaurantID } },
          }),
          req.payload.find({
            collection: 'dishes',
            where: {
              _id: { in: dishes.map((d: any) => d.id) },
              restaurant: { equals: restaurantID },
            },
          }),
        ])

        const restaurant = restaurantResult.docs[0]
        if (!restaurant) {
          throw new Error('Something went wrong. Restaurant not found.')
        }

        if (!foundDishes.docs.length) {
          throw new Error('Something went wrong. The selected dishes were not found.')
        }

        let totalAmount = 0
        const findAndCountDishes = foundDishes.docs.map((dish) => {
          const quantity = dishes.find((d: any) => d.id === dish.id)?.quantity || 1
          totalAmount += dish.price * quantity
          return { dish: dish.id, quantity }
        })

        const deliveryPrice =
          totalAmount > (restaurant.freeAfterAmount || 0) ? 0 : restaurant.deliveryPrice
        data.dishes = findAndCountDishes
        data.totalAmount = totalAmount
        data.deliveryPrice = deliveryPrice
        data.restaurantName = restaurant.title || 'Restaurant name not found...'
      },
    ],
  },
}

export default Orders
