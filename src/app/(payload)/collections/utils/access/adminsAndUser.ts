import type { Access } from "payload";

import { checkRole } from "./checkRole";

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    if (checkRole(["guest"], user)) {
      return false;
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};

export default adminsAndUser;
