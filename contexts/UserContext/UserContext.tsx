import { useUser } from "@clerk/nextjs";
import { Link, User } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import { UserContextType, UserProviderProps } from "./UserContext.types";

export const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: false,
  links: null,
  reloadUser: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
    const {user} = useUser();
    const [infoUser, setInfoUser] = useState<User| null>(null)
    const [links , setLinks] = useState<Link[] | null>(null)
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserInfo = async () => {
        if (!user) return

        try {
            setIsLoading(true);
            const response = await fetch(`/api/info-user`);
            const data = await response.json();
            console.log("API Response (/api/info-user):", data);
            setInfoUser(data || null);
            setLinks(data?.links || null);

        } catch (error) {
            console.error("Error fetching user info:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const reloadUser = () => fetchUserInfo();

    const data = {
        user: infoUser,
        isLoading,
        links,
        reloadUser,
      };
    
    return (
        <UserContext.Provider value={data}>
          {children}
        </UserContext.Provider>
      );
}