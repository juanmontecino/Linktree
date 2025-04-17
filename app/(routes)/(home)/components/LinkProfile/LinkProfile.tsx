"use client"

import { Button } from "@/components/ui/button"
import { useUserInfo } from "@/hooks/useUser"
import { useState } from "react"

export function LinkProfile() {
    const [isCopiedLink, setIsCopiedLink] = useState(false)
    const {user} = useUserInfo()

    if(!user) return null

    const copyLink = () => {
        const url =  `${window.location.origin}/${user.username}`
        navigator.clipboard.writeText(url)
        setIsCopiedLink(true)
    }
  return (
    <div className="bg-indigo-200 rounded-3xl">
        <div className="flex flex-col items-center justify-center text-center py-4 px-4 gap-2 md:flex-row md:justify-between md:text-left">
            <span className="text-sm">
                <span>Your clone is live on </span> {window.location.origin}/{user.username}
            </span>

            <Button variant="outline" className="rounded-full bg-white px-4 font-semibold text-xs md:text-[16px]" onClick={copyLink}>
                {isCopiedLink ? "Copied" : "Copy your link"}
            </Button>
        </div>
        
    </div>
  )
}
