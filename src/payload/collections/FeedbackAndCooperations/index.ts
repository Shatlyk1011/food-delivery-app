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
      label: "Name",
      required: false,
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "Phone number",
      required: false,
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          label: "Cooperation",
          value: "cooperation",
        },
        {
          label: "Feedback",
          value: "feedback",
        },
      ],
    },
  ],
  labels: { plural: "Feedback and suggestions", singular: "Feedback and suggestions" },
  slug: "FeedbackAndCooperations",
  timestamps: true,
};

export default FeedbackAndCooperations;
