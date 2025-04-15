import { useUserInfo } from "@/hooks/useUser"
import { Palmtree } from "lucide-react"
import Image from "next/image"
import { ListSocialNetworks } from "./ListSocialNetworks"


export function PhonePreview() {
    const {user} = useUserInfo()

  return (
    <div className="my-5">
        <div className="relative mx-auto border-white border-[5px] rounded-[2.5rem] w-[300px] h-[600px] shadow-xl">
            <div className="relative rounded-[2rem] w-[290px] h-[590px] overflow-hidden">
                {user?.backgroundImage?(
                    <Image src={user?.backgroundImage} alt="background" layout="fill" objectFit="cover" className="absolute top-0 left-0 w-full h-full"/>
                ):(
                    <div className="absolute top-0 left-0 w-full h-full bg-[#E4E9ED]"/>
                )}

                <div className=" relative z-10 flex flex-col items-center justify-between p-6 h-full">
                    <Image src={user?.avatarUrl || "/avatar-negro.jpg"} alt="avatar" width={50} height={50} className="rounded-full object-cover "/>
                    <p className="font-semibold text-sm text-blue-700">@{user?.username}</p>
                    {user?.bio && (
                        <div className="my-2">
                        <p className="text-center">{user?.bio}</p>
                        </div>
                    )}

                    <div className="min-h-[70%]">
                        <ListSocialNetworks/>
                    </div>

                    <div>
                        <p className=" flex gap-1 items-center font-semibold ">

                        
                        JotaLink <Palmtree className="w-4 h-4"/>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
