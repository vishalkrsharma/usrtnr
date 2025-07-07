export type TResponse<T> = {
  success: boolean;
  data?: T | null;
  error?: Error | null;
  message: string;
};

export type TNavLink = {
  title: string;
  href: string;
};

export type TIPAddrRes = {
  countryCode?: string;
  query: string;
};
