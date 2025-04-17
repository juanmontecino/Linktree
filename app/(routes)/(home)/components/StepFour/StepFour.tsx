import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStepConfig } from "@/hooks/useStepConfig";
import { UploadButton } from "@/lib/uploadthing";
import axios from "axios";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { dataStepFourImages } from "./StepFour.data";

// Interfaz para los datos extendidos de archivo subido
interface UploadThingResponse {
  url: string;
  appUrl?: string;
  ufsUrl?: string;
  name?: string;
  key?: string;
  size?: number;
  type?: string;
}

export function StepFour() {
const [name, setName] = useState("")
const [username, setUsername] = useState("")
const [photoUrl, setPhotoUrl] = useState("")
const [showUploadPhoto, setShowUploadPhoto] = useState(false)
const [selectedPhoto, setSelectedPhoto] = useState("")

const { setInfoUser, nextStep, infoUser } = useStepConfig()

const handleImageSelect = (src: string) => {
  setSelectedPhoto(src)
  setInfoUser((prevInfoUser) => ({
    ...prevInfoUser,
    avatarUrl: src
  }))
}

// Función para remover acentos/tildes
const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const handleContinue = async () => {
  if (!name || !username) {
    alert("Please fill all the fields")
    return
  }

  // Asegurarse de que el username no tenga tildes
  const usernameWithoutAccents = removeAccents(username);

  setInfoUser((prevInfoUser) => ({
    ...prevInfoUser,
    name,
    username: usernameWithoutAccents
  }))

  try{
    const response = await axios.post("/api/user", {
      name: name,
      username: usernameWithoutAccents,
      avatarUrl: infoUser.avatarUrl,
      links : infoUser.platforms,
      typeUser: infoUser.typeUser
    })

    if (response.status === 200) {
      nextStep()
    }
  }
  catch(error){
    toast.error("This user already exists")
    console.error(error)
  }
}

const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Eliminar tildes al escribir
  setUsername(removeAccents(e.target.value));
}

console.log(photoUrl)

  return (
    <div>
        <h2 className="text-center font-semibold text-2xl">Add profile details</h2>
        <p className="text-center">Select you profle image or upload it</p>

        <div className=" grid grid-cols-2 gap-4 md:grid-cols-5 mt-4 items-center">
          {dataStepFourImages.map(({src}) => (
            <div
            key={src} 
            className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer
            ${selectedPhoto === src ? 'bg-violet-500' : 'hover:bg-violet-300'}
            `}
            onClick={() => handleImageSelect(src)}
            >
            <Image src={src} alt="profile" width={300} height={300} className="rounded-full h-30 w-30"/>
             </div>
          ))}


          {photoUrl && (
            <div className={`flex flex-col items-center gap-2 p-1 rounded-full text-white transition-all duration-300 cursor-pointer
            ${selectedPhoto === photoUrl ? 'bg-violet-500' : 'hover:bg-violet-300'}
            `}
              onClick = {() => handleImageSelect(photoUrl)}>
                <Image src={photoUrl} alt="profile" width={300} height={300} className="rounded-full h-30 w-30 object-cover aspect-square"/>
            </div>
          )}


          {showUploadPhoto ? (
          <div className="w-full">
            <p className="text-xs mb-2 text-center">Subir imagen</p>
            <UploadButton 
              className="rounded-md text-slate-800 bg-slate-300 h-full ut-button:bg-purple-600 ut-button:text-white"
              endpoint="profileImage"
              onClientUploadComplete={(res) => {
                console.log("Carga completa, respuesta completa:", JSON.stringify(res, null, 2));
                if (res && res.length > 0) {
                  const response = res[0] as UploadThingResponse;
                  
                  const ufsUrl = response.ufsUrl || "";
                  
                  console.log("URL de UFS:", ufsUrl);
                  
                  const finalUrl = ufsUrl;
                  
                  if (finalUrl) {
                    console.log("Usando URL final (UFS):", finalUrl);
                    setPhotoUrl(finalUrl);
                    setSelectedPhoto(finalUrl);
                    setInfoUser((prevInfoUser) => ({
                      ...prevInfoUser,
                      avatarUrl: finalUrl
                    }));
                    setShowUploadPhoto(false);
                  } else {
                    console.error("No se recibió ufsUrl de la imagen");
                  }
                } else {
                  console.error("Respuesta vacía de uploadthing");
                }
              }}
              onUploadError={(error: Error) => {
                console.error("Error al subir la imagen:", error);
              }}
              onUploadBegin={() => {
                console.log("Comenzando la carga de la imagen...");
              }}
            />
          </div>
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
            <Input 
              placeholder="Username" 
              className="w-full" 
              value={username} 
              onChange={handleUsernameChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button className="w-full bg-purple-600" disabled={!selectedPhoto || !name || !username} onClick={handleContinue}>Continue</Button>
        </div>
    </div>
  )
}