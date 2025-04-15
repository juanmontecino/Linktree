import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useUserInfo } from "@/hooks/useUser";
import { RemoveSocialNetworkProps } from "./RemoveSocialNetwork.types";
import { Trash } from "lucide-react";

export  function RemoveSocialNetwork(props: RemoveSocialNetworkProps) {
    const {linkId, onReload} = props
    const [showDialog, setShowDialog] = useState(false)
    const {reloadUser} = useUserInfo()


    const onDelete = async () => {
        await axios.delete(`/api/social-network/${linkId}`)
        setShowDialog(false)
        onReload(true)
        reloadUser()
    }
    
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
            <Button variant="destructive">
                <Trash className="w-4 h-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>

            <DialogHeader>
            <DialogTitle>Delete social network</DialogTitle>
            <div className="flex flex-col gap-4 mt-4">
                <Button className="w-full bg-red-700 text-white rounded-full" onClick={onDelete}> Delete </Button>
                <Button className=" rounded-full hover:bg-slate-300" variant="outline" onClick={() => setShowDialog(false)}> Cancel </Button>
            </div>
            </DialogHeader>

        </DialogContent>
    </Dialog>

  )
}
