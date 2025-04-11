import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/lib/uploadthing";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { dataStepFourImages } from "./StepFour.data";

export function StepFour() {
const [name, setName] = useState("")
const [username, setUsername] = useState("")
const [photoUrl, setPhotoUrl] = useState("")
const [showUploadPhoto, setShowUploadPhoto] = useState(false)
const [selectedPhoto, setSelectedPhoto] = useState("")

console.log(photoUrl)

  return (
    <div>
        <h2 className="text-center font-semibold text-2xl">Add profile details</h2>
        <p className="text-center">Select you profle image or upload it</p>

        <div className=" grid grid-cols-2 gap-4 md:grid-cols-5 mt-4 items-center">
          {dataStepFourImages.map(({src}) => (
            <div
            key={src} 
            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer`}
            >
            <Image src={src} alt="profile" width={300} height={300} className="rounded-full h-30 w-30"/>
             </div>
          ))}


          {photoUrl && (
            <div className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer
            ${selectedPhoto == photoUrl ? 'bg-violet-500' : 'hover:bg-violet-300'}
            `}
              onClick = {() => console.log("")}>
                <Image src={photoUrl} alt="profile" width={300} height={300} className="rounded-full h-30 w-30 object-cover aspect-square"/>
            </div>
          )}


          {showUploadPhoto ? (
          <UploadButton 
            className="rounded-md text-slate-800 bg-slate-300 h-full"
            endpoint="profileImage"
            onClientUploadComplete={(res) => {
              setPhotoUrl(res?.[0].url)
              setShowUploadPhoto(false)
            }}
            onUploadError={(error: Error) => {
              console.log(error)
            }}
          />
          ): (
            <div className="flex flex-col items-center justify-center hover:bg-slate-100 h-full rounded-full cursor-pointer border" onClick={() => setShowUploadPhoto(!showUploadPhoto)}>
              <Plus className="w-7 h-7" />
              
            </div>
          )}
        </div>

        <div className="mt-5 ">
          <h3 className="text-lg my-3 text-center"> Add your username</h3>
          <div className="grid gap-4">
            <Input placeholder="Name" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Username" className="w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-full bg-purple-600">Continue</Button>
        </div>
    </div>
  )
}
