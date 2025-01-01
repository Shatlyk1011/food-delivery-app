import type { AccessArgs } from "payload";
import { User } from "@/payload-types";

import { checkRole } from "./checkRole";

type isAdmin = (args: AccessArgs<User>) => boolean;

export const admins: isAdmin = ({ req: { user } }) => {
  return checkRole(["admin"], user);
};
