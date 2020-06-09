export const hasRole = (role: string | null, roles: Array<string>) =>
  role ? roles.some(() => roles.includes(role)) : false;
