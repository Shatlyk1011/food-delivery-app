import type { Access } from "payload/types";

import { checkRole } from "../checkRole";

const adminAndCreatedByUser: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    return {
      createdBy: {
        equals: user.id,
      },
    };
  }

  return false;
};

export default adminAndCreatedByUser;
