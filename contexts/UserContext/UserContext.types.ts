import { Link, User } from "@prisma/client";

export type UserContextType = {
  user: User | null;
  isLoading: boolean;
  links: Link[] | null;
  reloadUser: () => void;
};

export type UserProviderProps = {
  children: React.ReactNode;
};