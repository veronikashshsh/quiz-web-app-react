export const ROUTES = {
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  DASHBOARD: (displayName: string) => `/dashboard/${encodeURIComponent(displayName)}`,
} as const;
