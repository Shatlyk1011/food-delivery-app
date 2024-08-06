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
    username: z.string().min(4, {
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

// Bucket form scheme
export const buckerFormScheme = (t: (arg: string) => string) =>
  z.object({
    city: z.string().min(6, {
      message: t("Zod.invalidAddress"),
    }),
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
    comment: z.string().min(0, {
      message: t("Zod.invalidComment"),
    }),
  });
