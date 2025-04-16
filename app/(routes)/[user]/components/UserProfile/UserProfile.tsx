import Image from "next/image";
import { UserProfileProps } from "./UserProfile.types";
import { TreePalm } from "lucide-react";
import { MoreInfoProfile } from "./MoreInfoProfile";


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
          <p className="font-semibold text-2xl text-blue-600">@{user.username}</p>
          {user?.bio && 
          <div className="mt-2">
            <p className="text-center">{user.bio}</p>
          </div>
          }
        </div>

        <div className="flex gap-5 mt-10 ">
          {user.links.map((link) => (
            <a
              key={link.id}
              href={link.link || ''}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black rounded-lg px-4 py-2 text-center"
            >
              <Image src={link.icon || ''} alt={"icon"} width={60} height={60}  className="hover:scale-110 transition-all duration-200" />
            </a>
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
