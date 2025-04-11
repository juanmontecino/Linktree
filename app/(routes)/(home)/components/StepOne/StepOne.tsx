import { Button } from "@/components/ui/button";
import { dataCreator } from "./StepOne.data";
import { useStepConfig } from "@/hooks/useStepConfig";
import { useState } from "react";

export function StepOne() {
    const { setInfoUser, nextStep, infoUser } = useStepConfig()
    const [selectedType, setSelectedType] = useState<string>(infoUser?.typeUser || "")

    const handleClick = (value: string) => {
        setSelectedType(value)
        setInfoUser((prevInfoUser)=> ({
            ...prevInfoUser,
            typeUser : value
        }))
    }

  return (
    <div>
        <h2 className="text-center font-semibold text-2xl">Tell us about yourself</h2>
        <p className="text-center">This help us perzonalize your experencie</p>

        <div className="grid grid-cols-1 gap-2 mt-4">
            {dataCreator.map((data) => (
                <div 
                    key={data.title} 
                    className={`flex flex-col items-center rounded-full py-2 transition-all duration-300 cursor-pointer
                    ${selectedType === data.value 
                        ? 'bg-violet-900 text-white hover:bg-violet-800' 
                        : 'bg-slate-100 text-violet-900 hover:bg-slate-200'}`}
                    onClick={() => handleClick(data.value)}
                >
                    {data.title}
                </div>
            ))}
        </div>

        <div className="mt-6">
            <Button 
                className="w-full bg-purple-600" 
                onClick={nextStep}
                disabled={!selectedType}
            >
                Continue
            </Button>
        </div>
    </div>
  )
}