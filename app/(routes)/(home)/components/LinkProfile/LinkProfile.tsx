"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LinkProfile() {
    const [isCopiedLink, setIsCopiedLink] = useState(false)

    const copyLink = () => {
        const url = window.location.origin
        navigator.clipboard.writeText(url)
        setIsCopiedLink(true)
    }
  return (
    <div className="bg-indigo-200 rounded-3xl">
        <div className="flex flex-col items-center justify-center text-center py-4 px-4 gap-2 md:flex-row md:justify-between md:text-left">
            <span className="text-sm">
                <span>You clone is live on </span> {window.location.origin}
            </span>

            <Button variant="outline" className="rounded-full bg-white px-4 font-semibold text-xs md:text-[16px]" onClick={copyLink}>
                {isCopiedLink ? "Copied" : "Copy your link"}
            </Button>
        </div>
        
    </div>
  )
}
