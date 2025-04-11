import { LoaderCircle } from "lucide-react";

export function LoaderProfile() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2">
        <LoaderCircle className="w-10 h-10 animate-spin" />
        <p>Loading...</p>
    </div>
  )
}
