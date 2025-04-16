import { TreePalm } from "lucide-react"
import Link from "next/link"

export function NotFoundUser() {
  return (
    <div className=" h-screen flex flex-col justify-between items-center ">
        <div className="mt-40 text-center items-center flex flex-col gap-5">
            <TreePalm className="text-green-400 w-20 h-20" />
            <p className="text-2xl">The page you are looking for doesnt exists</p>
            <p className=""> Want this to be your username? {" "} <Link href="/" className="underline"></Link></p>
        </div>

        <div className="flex gap-2 font-semibold pb-5 items-center justify-center">
            
            JotaLink © 2025
            <TreePalm className=" w-5 h-5" />
        </div>
    </div>
  )
}
