import type { CollectionConfig } from "payload/types";

import { admins } from "../../access/admins";

const FeedbackAndCooperations: CollectionConfig = {
  access: {
    create: () => true,
    delete: admins,
    read: admins,
    update: admins,
  },

  admin: {
    defaultColumns: ["name", "phoneNumber", "type"],
    useAsTitle: "type",
  },

  fields: [
    {
      name: "name",
      type: "text",
      label: "Имя",
      required: false,
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "Номер телефона",
      required: false,
    },
    {
      name: "description",
      type: "textarea",
      label: "Описание",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          label: "Сотрудничество",
          value: "cooperation",
        },
        {
          label: "Обратная связь",
          value: "feedback",
        },
      ],
    },
  ],
  labels: { plural: "Отзывы и предложения", singular: "Отзыв/предложение" },
  slug: "FeedbackAndCooperations",
  timestamps: true,
};

export default FeedbackAndCooperations;
