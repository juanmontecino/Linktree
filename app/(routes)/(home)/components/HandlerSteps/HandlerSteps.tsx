import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useStepConfig } from "@/hooks/useStepConfig";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { HandlerStepsProps } from "./HandlerSteps.types";
import { StepOne } from "../StepOne";
import { StepTwo } from "../StepTwo";
import { StepThree } from "../StepThree";
import { StepFour } from "../StepFour";

  

export function HandlerSteps(props : HandlerStepsProps) {
    const {onReload} = props
    const [openDialog, setOpenDialog] = useState(true)
    const {totalSteps, step, prevStep} = useStepConfig()

    const progressValue = (step / totalSteps) * 100

    const onCloseDialog = () => {
       onReload(true);
       setOpenDialog(false)
    }

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle className="mb-3">
                    {step > 1 && step < 5 && (
                        <Button variant="outline" className="mr-2" onClick={prevStep}>
                            Back <ArrowLeft/>
                        </Button>
                    )}
                    <div className="mb-2 text-center">
                        Step {step} of {totalSteps}
                    </div>
                    <Progress value={progressValue} />
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                    <div>
                        {step === 1 && <StepOne />}
                        {step === 2 && <StepTwo/>}
                        {step === 3 && <StepThree/>}
                        {step === 4 && <StepFour/>}
                        {step === 5 && (<p>Step five</p> )}
                   </div>
                </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
  )
}
