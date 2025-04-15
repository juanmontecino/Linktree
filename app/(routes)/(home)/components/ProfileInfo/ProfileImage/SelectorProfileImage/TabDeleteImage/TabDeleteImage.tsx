import { ChevronLeft } from "lucide-react";
import { TabDeleteImageProps } from "./TabDeleteImage.types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useUserInfo } from "@/hooks/useUser";


export  function TabDeleteImage(props : TabDeleteImageProps) {
  const {setShowDialog, setShowTab} = props
  const {reloadUser} = useUserInfo()
  
  const onDeletePhoto = async () => {
    await axios.patch("/api/update-user", {
      avatarUrl: "https://e53dh9apex.ufs.sh/f/xYYNeMWhqUXrjEGhmExypcW5N7l8d3qHoVfu1OTwKAFjCkiZ"
    })
    setShowDialog(false)
    toast.success("Profile photo removed")
    reloadUser()
  }


  return (
    <div>
      <div className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-300 p-1 rounded-lg w-fit">
        <ChevronLeft className="w-4 h-4" onClick={() => setShowTab(null)} />
        Back
      </div>

      <div className="flex flex-col gap-2 mt-3">

        <Button className=" bg-red-700 text-white rounded-full " onClick={() => onDeletePhoto()}>
          Yes, remove
        </Button>

        <Button className=" rounded-full hover:bg-slate-300" variant="outline" onClick={() => setShowTab(null)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
