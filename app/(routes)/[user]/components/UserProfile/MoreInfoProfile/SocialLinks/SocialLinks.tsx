
import { SocialLinksProps } from "./SocialLinks.types";
import { Link } from "lucide-react";


export function SocialLinks(props: SocialLinksProps) {
    const { userName } = props

    const copyToClipboard = () => {
        const url = `${window.location.origin}/${userName}`

        navigator.clipboard.writeText(url).then(() => {
           alert ("Link copied to clipboard")
        }).catch((err) => {
            console.error("Failed to copy URl", err)
        })

    }
  return (
    <div className="overflow-auto">
        <div className="flex py-4 gap-6">
            <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={copyToClipboard} >
                <Link className="text-sm text-gray-500 hover:text-gray-700 transition-all duration-200"/>
                <span className=" text-xs font-semibold  ">Copy</span>

            </div>

        </div>

    </div>
  )
}
