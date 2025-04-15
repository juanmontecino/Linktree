import { useUserInfo } from "@/hooks/useUser"
import Image from "next/image"


export function ListSocialNetworks() {
    const {links} = useUserInfo()

    if (!links) return null
    
  return (
    <ul className=" grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {links.map((link) => (
            <li key={link.id}>
                <a href={link.link || ""} target="_blank" rel="noreferrer" >
                    <Image src={link.icon || ""} alt={"icon"} width={40} height={40}/>
                </a>
            </li>
        ))}

    </ul>
  )
}
