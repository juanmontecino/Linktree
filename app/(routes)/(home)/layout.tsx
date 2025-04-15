import { AdminSidebar } from "@/components/Shared"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function HomeLayout( {children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
        <AdminSidebar/>
        <main className="w-full bg-[#DEDEDD]">
            <div className="px-3">
                <SidebarTrigger/>
            </div>
            {children}
        </main>
    </SidebarProvider>

  )
}
