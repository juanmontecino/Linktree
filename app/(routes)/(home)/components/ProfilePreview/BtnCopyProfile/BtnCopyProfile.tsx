import { Button } from "@/components/ui/button"
import { useUserInfo } from "@/hooks/useUser"
import { useState } from "react"


export  function BtnCopyProfile() {
    const [isCopyProfile, setIsCopyProfile] = useState(false)

    const {user} = useUserInfo()

    if (!user) return null

    const copyProfile = () =>{
        const url = `${window.location.origin}/${user.username}`
        navigator.clipboard.writeText(url)

        setIsCopyProfile(true)

        setTimeout(() => {
            setIsCopyProfile(false)
        }, 2000)
    }


  return (
    <div className="pl-6 mt-6">
        <div className="border py-2 rounded-full flex justify-between items-center" onClick={copyProfile}>
            <span className=" pl-4 "> {window.location.origin}/
                <span className="font-semibold">{user.username}</span>
            </span>
            <Button className="bg-blue-600 text-black py-1 px-2 font-semibold hover:bg-blue-800 rounded-full" > 
                {isCopyProfile ? "Copied" : "Copy"}
            </Button>

        </div>

    </div>
  )
}
