import { admins } from "../../access/admins";
import { adminsOrPublished } from "../../access/adminsOrPublished";
import type { CollectionConfig } from "payload/types";

const Restaurants: CollectionConfig = {
  slug: "restaurants",

  access: {
    create: admins,
    delete: () => false,
    update: adminsOrPublished,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Название ресторана",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Описание ресторана",
      type: "textarea",
    },
    {
      name: "address",
      label: "Адрес ресторана",
      type: "text",
      required: true,
    },
    {
      name: "isBlocked",
      label: "Заблокировано",
      type: "checkbox",
      required: false,
      defaultValue: false,
      access: {
        read: admins,
        update: admins,
      },
    },

    {
      name: "deliveryTime",
      label: "Время доставки ",
      type: "select",
      options: [
        {
          label: "30 - мин",
          value: "30",
        },
        {
          label: "45 - мин",
          value: "45",
        },
        {
          label: "60 - мин",
          value: "60",
        },
        {
          label: "90 - мин",
          value: "90",
        },
        {
          label: "120 - мин",
          value: "120",
        },
        {
          label: "120+ - мин",
          value: "not_today",
        },
      ],
      defaultValue: "60",
      required: true,
    },
    {
      name: "isDelivery",
      label: "Доступна ли доставка?",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
    {
      name: "deliveryPrice",
      label: "Цена доставки (в манатах)",
      type: "number",
      required: true,
      defaultValue: 5,
    },
    {
      name: "freeAfterAmount",
      label: "Бесплатно после (в манатах)",
      type: "number",
      required: false,
      defaultValue: 150,
    },
    //open times close times
    {
      name: "workingHours",
      label: "Режим работы",
      type: "group",
      fields: [
        {
          name: "openTime",
          label: "Время открытия",
          type: "select",
          options: [
            {
              label: "07:00",
              value: "0700",
            },
            {
              label: "07:30",
              value: "0730",
            },
            {
              label: "08:00",
              value: "0800",
            },
            {
              label: "08:30",
              value: "0830",
            },
            {
              label: "09:00",
              value: "0900",
            },
            {
              label: "09:30",
              value: "0930",
            },
            {
              label: "10:00",
              value: "1000",
            },
            {
              label: "10:30",
              value: "1030",
            },
            {
              label: "11:00",
              value: "1100",
            },
            {
              label: "11:30",
              value: "1130",
            },
            {
              label: "12:00",
              value: "1200",
            },
          ],
          required: true,
        },
        {
          name: "closeTime",
          label: "Время закрытия",
          type: "select",
          options: [
            {
              label: "19:00",
              value: "1900",
            },
            {
              label: "19:30",
              value: "1930",
            },
            {
              label: "20:00",
              value: "2000",
            },
            {
              label: "20:30",
              value: "2030",
            },
            {
              label: "21:00",
              value: "2100",
            },
            {
              label: "21:30",
              value: "2130",
            },
            {
              label: "22:00",
              value: "2200",
            },
            {
              label: "22:30",
              value: "2230",
            },
            {
              label: "23:00",
              value: "2300",
            },
            {
              label: "23:30",
              value: "2330",
            },
            {
              label: "00:00",
              value: "2400",
            },
          ],
          required: true,
        },
      ],
    },

    {
      name: "budgetCategory",
      label: "Ценовая категория",
      type: "radio",
      required: false,
      defaultValue: "cheap",
      options: [
        {
          label: "Не дорогой",
          value: "cheap",
        },
        {
          label: "Средний",
          value: "average",
        },
        {
          label: "Дорогой",
          value: "expensive",
        },
      ],
    },
    {
      name: "cities",
      label: "В каких городах есть этот ресторан?",
      required: false,
      type: "relationship",
      relationTo: "cities",
      hasMany: true,

      access: {
        read: admins,
        update: admins,
      },
    },
    {
      name: "isClosed",
      label: "Закрыто",
      type: "checkbox",
      required: false,
      defaultValue: false,
    },
  ],
};

export default Restaurants;
