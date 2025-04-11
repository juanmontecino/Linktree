import { ReactNode } from "react"

export type StepConfigUserContextType = {
    step: number
    setStep: React.Dispatch<React.SetStateAction<number>>
    setInfoUser : React.Dispatch<React.SetStateAction<InfoUserType>>
    infoUser: InfoUserType
    totalSteps: number
    nextStep: () => void
    prevStep: () => void
}

type InfoUserType = {
    typeUser : string
    name: string
    platforms : {
        icon: string
        link: string
        name : string
    }[];
    avatarUrl: string
    username : string
}

export type StepConfigUserProviderProps = {
    children: ReactNode
}