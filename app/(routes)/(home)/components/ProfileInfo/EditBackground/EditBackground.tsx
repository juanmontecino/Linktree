import { useState } from "react";
import { EditBackgroundProps } from "./EditBackground.types";
import { useUserInfo } from "@/hooks/useUser";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Ellipsis, ImagePlus } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";


export  function EditBackground(props: EditBackgroundProps) {
    const {onReload} = props;
    const [showDialog, setShowDialog] = useState(false)
    const [photoUrl , setPhotoUrl] = useState("")
    const {reloadUser} = useUserInfo()

    const onChangeBackgorund = async () => {
       await axios.patch("/api/update-user", {
        backgroundImage: photoUrl
       })
       reloadUser()
       setShowDialog(false)
       toast.success("Background updated!")     
       onReload(true)
       setPhotoUrl("")
    }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="p-2 rounded-full bg-[#D4D4D2]">
                    <Ellipsis fill ="black" strokeWidth={1}/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem>
                    <DialogTrigger>
                        <div className="flex gap-1 items-center">
                            <ImagePlus className="w-4 h-4" />
                            Edit or add background  
                        </div>
                    </DialogTrigger>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DialogContent>
        <DialogHeader>
            <DialogTitle>Change backgorund</DialogTitle>
            <div className="my-4">
            {photoUrl? (
                <div>
                    <Image src={photoUrl} alt="Profile" width={300} height={300} />
                </div>
            ): (
                <UploadButton 
                className="rounded-md text-slate-800 bg-slate-300 h-full py-10"
                endpoint="profileImage"
                onClientUploadComplete={(res) => {
                    setPhotoUrl(res?.[0].ufsUrl)
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`)
                }}
                />
            )}
            </div>
            <Button className="w-full rounded-full bg-violet-500"
            disabled={!photoUrl}
            onClick={onChangeBackgorund}
            >
                Change background
            </Button>
        </DialogHeader>
        </DialogContent>
  </Dialog>
  
  )
}
