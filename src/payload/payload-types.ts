/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    restaurants: Restaurant;
    users: User;
    media: Media;
    cities: City;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "restaurants".
 */
export interface Restaurant {
  id: string;
  title: string;
  description?: string | null;
  address: string;
  deliveryTime: '30' | '45' | '60' | '90' | '120' | 'not_today';
  deliveryPrice: number;
  freeAfterAmount?: number | null;
  workingHours: {
    openTime: '0700' | '0730' | '0800' | '0830' | '0900' | '0930' | '1000' | '1030' | '1100' | '1130' | '1200';
    closeTime: '1900' | '1930' | '2000' | '2030' | '2100' | '2130' | '2200' | '2230' | '2300' | '2330' | '2400';
  };
  isClosed?: boolean | null;
  isDelivery: boolean;
  bannerImage: string | Media;
  budgetCategory?: ('cheap' | 'average' | 'expensive') | null;
  isBlocked?: boolean | null;
  relatedToUser: string | User;
  cities?: (string | City)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  createdBy?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  restaurant?: (string | null) | Restaurant;
  roles?: ('admin' | 'author' | 'moderator')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cities".
 */
export interface City {
  id: string;
  title?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}