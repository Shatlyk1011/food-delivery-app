//user role represenets actual registered user. all other roles related to admin panel
export const checkRole = (allRoles: ("admin" | "author" | "guest" | "user")[] = [], user?: any): boolean => {
  if (user) {
    if (
      allRoles.some((role) => {
        return user?.roles?.some((individualRole: any) => {
          return individualRole === role;
        });
      })
    )
      return true;
  }

  return false;
};
