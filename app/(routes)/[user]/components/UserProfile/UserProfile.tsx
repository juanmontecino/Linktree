import Image from "next/image";
import { UserProfileProps } from "./UserProfile.types";
import { ExternalLink, TreePalm } from "lucide-react";
import { MoreInfoProfile } from "./MoreInfoProfile";
import Link from "next/link";


export function UserProfile(props: UserProfileProps) {
  const { user } = props

  return (
    <div className="flex flex-col items-center justify-between gap-2 h-screen max-w-2xl mx-auto">
      {user?.backgroundImage?(
        <Image
          src={user.backgroundImage}
          alt="Background Image"
          layout="fill"
          objectFit="cover"

          className="absolute top-0 left-0 w-full h-full"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-[#6dade2]"></div>
      )}

      <div className=" flex flex-col items-center pt-32 w-full px-5 z-10">
        <MoreInfoProfile user={user} />

        <div>
          <Image src={user.avatarUrl || "/avatar-negro.jpg"} alt="Profile Image" width={96} height={96} className="rounded-full aspect-square object-cover" />
        </div>

        <div>
          <p className="font-semibold text-2xl text-cyan-900 text-center">@{user.username}</p>
          {user?.bio && 
          <div className="mt-2">
            <p className="text-center text-lg">{user.bio}</p>
          </div>
          }
        </div>

        <div className="flex flex-col gap-5 mt-10 ">
          {user.links.map((link) => (
            <div key={link.id} className="bg-cyan-900 text-white w-[400px] px-10 py-4 items-center justify-center hover:bg-violet-200 hover:text-violet-900 transition-all duration-200 rounded-full">
              <Link href={link.link || ""} target="_blank" className="flex justify-between items-center ">
              <Image src={link.icon || " "} alt="Link Icon" width={30} height={30}  className=" hover:scale-110 transition-all duration-200 filter grayscale"/>
              <p className="text-lg font-medium">{link.name}</p>
              <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-5 z-10">
        <div className="flex items-center gap-2 justify-center py-2 px-5 bg-white rounded-full shadow-lg">
          <TreePalm className="h-5 w-5" />
          JotaLink
        </div>

      </div>

    </div>
  )
}
