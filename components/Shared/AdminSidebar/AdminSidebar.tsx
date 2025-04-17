"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LogOut, TreePalm } from "lucide-react"
import { useClerk } from "@clerk/nextjs"

export function AdminSidebar() {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="h-full">
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          <TreePalm className="h-5 w-5"/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut}>
                <LogOut />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}