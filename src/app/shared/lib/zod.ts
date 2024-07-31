import { z } from "zod";

// Login Scheme
export const loginScheme = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "password at least 8 characters.",
  }),
});

// Register Scheme
export const registerScheme = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "password at least 8 characters.",
  }),
  phone: z.string().min(11, {
    message: "enter valid phone number",
  }),
});

// Bucket form scheme
export const buckerFormScheme = z.object({
  city: z.string().min(2, {
    message: "city must be at least 2 characters.",
  }),
  district: z.string().min(4, {
    message: "district at least 8 characters.",
  }),
  house_number: z.string().min(1, {
    message: "House number at least 8 characters.",
  }),
  apartment: z.string().min(1, {
    message: "Apartment at least 8 characters.",
  }),
  entrance: z.string().min(1, {
    message: "Entrance at least 8 characters.",
  }),
  phone_number: z.string().min(8, {
    message: "Phone Number at least 8 characters.",
  }),
  comment: z.string().min(0, {
    message: "comment at least 8 characters.",
  }),
});
