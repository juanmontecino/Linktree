"use client"
import { LoaderProfile } from "@/components/Shared";
import { StepConfigUserProvider } from "@/contexts";
import { UserButton, useUser } from "@clerk/nextjs";
import { Link, User } from "@prisma/client";
import { TreePalm } from "lucide-react";
import { useEffect, useState } from "react";
import { HandlerSteps, LinkProfile } from "./components";


export default function HomePage( ) {
  const {user} = useUser()
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [reload, setReload] = useState(false)
  const [infoUser , setInfoUser] = useState<(User & {links: Link[]} | null )>(null)

  useEffect(() => {
    const checkFirstLogin = async () => {
      const response = await fetch("api/info-user")
      const data = await response.json()
      setInfoUser(data)
      setIsFirstVisit(data.firstLogin)
    };
    checkFirstLogin()

    if (reload) {
      checkFirstLogin()
      setReload(false)
    }
  }, [user?.id, reload, user])
  
  if (!user || !infoUser){
    return <LoaderProfile />
  }

  if (isFirstVisit) {
    return (
     <StepConfigUserProvider>
      <HandlerSteps onReload={() => setReload } />
     </StepConfigUserProvider>
    )
  }
  return (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4 px-4">
      <div>

        <LinkProfile />

        <div>
          <p>porfile info</p>
        <UserButton/>

        </div>
        

        <div className="mt-20 flex flex-col items-center">
          <div className=" py-10 text-center justify-center flex flex-col items-center text-gray-400 font-semibold">
            <TreePalm className="w-20 h-20" strokeWidth={1}/>
              <p>Welcome to the TreePalm</p>
          </div>
        </div>
      </div>

      <div>
        <p>Profile preview</p>
      </div>

    </div>
  </div>
);
}
