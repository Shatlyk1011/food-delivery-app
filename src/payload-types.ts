/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
    customers: CustomerAuthOperations;
  };
  collections: {
    restaurants: Restaurant;
    orders: Order;
    dishes: Dish;
    cities: City;
    users: User;
    customers: Customer;
    media: Media;
    categories: Category;
    FeedbackAndCooperations: FeedbackAndCooperation;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    restaurants: RestaurantsSelect<false> | RestaurantsSelect<true>;
    orders: OrdersSelect<false> | OrdersSelect<true>;
    dishes: DishesSelect<false> | DishesSelect<true>;
    cities: CitiesSelect<false> | CitiesSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    customers: CustomersSelect<false> | CustomersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    categories: CategoriesSelect<false> | CategoriesSelect<true>;
    FeedbackAndCooperations: FeedbackAndCooperationsSelect<false> | FeedbackAndCooperationsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user:
    | (User & {
        collection: 'users';
      })
    | (Customer & {
        collection: 'customers';
      });
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
export interface CustomerAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
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
  bannerImage?: (string | null) | Media;
  categories?: (string | Category)[] | null;
  dishes?: (string | Dish)[] | null;
  budgetCategory?: ('1' | '2' | '3') | null;
  isBlocked?: boolean | null;
  relatedToUser: string | Customer;
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
  createdBy?: (string | null) | Customer;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
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
 * via the `definition` "customers".
 */
export interface Customer {
  id: string;
  name?: string | null;
  phone?: string | null;
  restaurant?: (string | Restaurant)[] | null;
  isBlocked?: boolean | null;
  roles?: ('admin' | 'author' | 'guest')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string;
  category: string;
  value: string;
  order?: number | null;
  type: 'dish' | 'restaurant';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "dishes".
 */
export interface Dish {
  id: string;
  title: string;
  description: string;
  price: number;
  gram: number;
  availableAmount?: number | null;
  cookTime: number;
  categories?: (string | null) | Category;
  image?: (string | null) | Media;
  restaurant: string | Restaurant;
  createdBy?: (string | null) | Customer;
  isBlocked?: boolean | null;
  updatedAt: string;
  createdAt: string;
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
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  city?: string | null;
  district: string;
  apartment: string;
  houseNumber: string;
  entrance?: string | null;
  phoneNumber: number;
  orderStatus?: ('pending' | 'recieved' | 'sended' | 'delivered' | 'rejected') | null;
  totalAmount?: number | null;
  deliveryPrice?: string | null;
  restaurantName?: string | null;
  commentToCourier?: string | null;
  commentToRestaurant?: string | null;
  isDelivery: boolean;
  dishes?:
    | {
        dish?: (string | null) | Dish;
        quantity?: number | null;
        id?: string | null;
      }[]
    | null;
  restaurantID: string;
  orderedByUser: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name: string;
  phone: string;
  addresses?:
    | {
        city?: string | null;
        district: string;
        apartment: string;
        houseNumber: string;
        entrance?: string | null;
        id?: string | null;
      }[]
    | null;
  roles?: 'user'[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeedbackAndCooperations".
 */
export interface FeedbackAndCooperation {
  id: string;
  name?: string | null;
  phoneNumber?: string | null;
  description: string;
  type: 'cooperation' | 'feedback';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'restaurants';
        value: string | Restaurant;
      } | null)
    | ({
        relationTo: 'orders';
        value: string | Order;
      } | null)
    | ({
        relationTo: 'dishes';
        value: string | Dish;
      } | null)
    | ({
        relationTo: 'cities';
        value: string | City;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'customers';
        value: string | Customer;
      } | null)
    | ({
        relationTo: 'media';
        value: string | Media;
      } | null)
    | ({
        relationTo: 'categories';
        value: string | Category;
      } | null)
    | ({
        relationTo: 'FeedbackAndCooperations';
        value: string | FeedbackAndCooperation;
      } | null);
  globalSlug?: string | null;
  user:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'customers';
        value: string | Customer;
      };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'customers';
        value: string | Customer;
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "restaurants_select".
 */
export interface RestaurantsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  address?: T;
  deliveryTime?: T;
  deliveryPrice?: T;
  freeAfterAmount?: T;
  workingHours?:
    | T
    | {
        openTime?: T;
        closeTime?: T;
      };
  isClosed?: T;
  isDelivery?: T;
  bannerImage?: T;
  categories?: T;
  dishes?: T;
  budgetCategory?: T;
  isBlocked?: T;
  relatedToUser?: T;
  cities?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders_select".
 */
export interface OrdersSelect<T extends boolean = true> {
  city?: T;
  district?: T;
  apartment?: T;
  houseNumber?: T;
  entrance?: T;
  phoneNumber?: T;
  orderStatus?: T;
  totalAmount?: T;
  deliveryPrice?: T;
  restaurantName?: T;
  commentToCourier?: T;
  commentToRestaurant?: T;
  isDelivery?: T;
  dishes?:
    | T
    | {
        dish?: T;
        quantity?: T;
        id?: T;
      };
  restaurantID?: T;
  orderedByUser?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "dishes_select".
 */
export interface DishesSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  price?: T;
  gram?: T;
  availableAmount?: T;
  cookTime?: T;
  categories?: T;
  image?: T;
  restaurant?: T;
  createdBy?: T;
  isBlocked?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cities_select".
 */
export interface CitiesSelect<T extends boolean = true> {
  title?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  phone?: T;
  addresses?:
    | T
    | {
        city?: T;
        district?: T;
        apartment?: T;
        houseNumber?: T;
        entrance?: T;
        id?: T;
      };
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "customers_select".
 */
export interface CustomersSelect<T extends boolean = true> {
  name?: T;
  phone?: T;
  restaurant?: T;
  isBlocked?: T;
  roles?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  createdBy?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories_select".
 */
export interface CategoriesSelect<T extends boolean = true> {
  category?: T;
  value?: T;
  order?: T;
  type?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "FeedbackAndCooperations_select".
 */
export interface FeedbackAndCooperationsSelect<T extends boolean = true> {
  name?: T;
  phoneNumber?: T;
  description?: T;
  type?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}