
import { useState } from "react";
import { TabUploadImageProps } from "./TabUploadImage.types";
import { ChevronLeft } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import axios from "axios";
import { useUserInfo } from "@/hooks/useUser";


export function TabUploadImage(props : TabUploadImageProps) {
  const {setShowDialog, setShowTab} = props
  const [photo, setPhoto] = useState("")
  const {reloadUser} = useUserInfo()

  const onUploadPhoto = async () => {
     await axios.patch("/api/update-user", {
      avatarUrl: photo
    })
    setShowDialog(false)
    toast.success("Profile photo updated")
    reloadUser()
  }


  return (
    <div>
      <div className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-200 p-1 rounded-lg w-fit">
        <ChevronLeft className="w-4 h-4" onClick={() => setShowTab(null)} />
        Back
      </div>

      <div className=" my-4">
        <UploadButton className="rounded-md text-slate-800 bg-slate-400 h-full w-full p-4" endpoint="profileImage" 
        onClientUploadComplete={(res) => {
            setPhoto(res?.[0].ufsUrl)          
        }}
        onUploadError={(error: Error) => {
          console.log(error);
          alert(`ERROR! ${error.message}`);
        }}
        />
      </div>

      <div>
        <Button className=" w-full bg-purple-600 text-white rounded-full " onClick={onUploadPhoto} disabled={!photo}>
          Upload
        </Button>
      </div>
    </div>
  )
}
