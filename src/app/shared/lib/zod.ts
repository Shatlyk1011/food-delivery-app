import { z } from "zod";

// Login Scheme
export const loginScheme = (t: (arg: string) => string) =>
  z.object({
    email: z.string().email({
      message: t("Zod.invalidEmail"),
    }),
    password: z.string().min(8, {
      message: t("Zod.invalidPassLength"),
    }),
  });

// Register Scheme
export const registerScheme = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(4, {
      message: t("Zod.invalidUsername"),
    }),
    email: z.string().min(2, {
      message: t("Zod.invalidEmail"),
    }),
    password: z.string().min(8, {
      message: t("Zod.invalidPassLength"),
    }),
    phone: z
      .string()
      .max(8)
      .min(8, {
        message: t("Zod.invalidPhone"),
      }),
  });

// Bucket form scheme (OrderForm type)
export const bucketFormScheme = (t: (arg: string) => string) =>
  z.object({
    district: z.string().min(4, {
      message: t("Zod.invalidDistrict"),
    }),
    houseNumber: z.string().min(2, {
      message: t("Zod.invalidHome"),
    }),
    apartment: z.string().min(1, {
      message: t("Zod.invalidApartment"),
    }),
    entrance: z.string().min(0, {
      message: t("Zod.invalidEntrance"),
    }),
    phoneNumber: z
      .string()
      .max(8)
      .min(8, {
        message: t("Zod.invalidPhone"),
      }),
    commentToCourier: z.string(),
    commentToRestaurant: z.string(),
  });

// Profile scheme

export const profileFormScheme = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(2, { message: t("Zod.invalidUsername") }),
    email: z
      .string()
      .min(3, { message: t("Zod.invalidEmail") })
      .email(t("Zod.invalidEmail")),
    phoneNumber: z
      .string()
      .max(8)
      .min(8, {
        message: t("Zod.invalidPhone"),
      })
      .length(8, { message: "Zod.invalidPhone" }),
    address: z.string().min(8, { message: t("Zod.invalidDistrict") }),
  });

export const addressFormScheme = (t: (arg: string) => string) =>
  z.object({
    city: z.string().min(4, {
      message: t("Zod.invalidAddress"),
    }),
    district: z.string().min(4, {
      message: t("Zod.invalidDistrict"),
    }),
    houseNumber: z.string().min(1, {
      message: t("Zod.invalidHome"),
    }),
    apartment: z.string().min(1, {
      message: t("Zod.invalidApartment"),
    }),
  });
