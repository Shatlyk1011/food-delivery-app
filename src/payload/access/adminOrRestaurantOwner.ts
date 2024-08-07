import type { Access } from "payload/types";

import { checkRole } from "./checkRole";

const adminOrRestaurantOwner: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }
    return {
      restaurantID: {
        equals: user.id,
      },
    };
  }

  return false;
};

export default adminOrRestaurantOwner;
