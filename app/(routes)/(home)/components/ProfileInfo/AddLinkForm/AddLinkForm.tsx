"use client"
import React from 'react'
import { AddLinkFormProps } from './AddLinkForm.types'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formSchema } from "./AddLinkForm.form";
import axios from "axios";
import { useUserInfo } from "@/hooks/useUser";
import { Plus } from 'lucide-react'
import { linksSocialNetwork } from '@/data/linksSocialNetwork'
import Image from 'next/image'
import { toast } from 'sonner'



export default function AddLinkForm(props: AddLinkFormProps) {
    const {onReload} = props
    const [showDialog, setShowDialog] = useState(false)
    const {reloadUser} = useUserInfo()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          icon: "",
          name: "",
          link:"",
        },
      })

      const onSubmit = async (values: z.infer<typeof formSchema>)=> {
        try {
            await axios.post(`/api/social-network`, values)
            toast.success("Social network added successfully")
            
            reloadUser()
            onReload(true)
            setShowDialog(false)

        } catch (error) {
            console.log(error)
        }
      }
    
  return (
  <div className=' mt-6'>
    <Dialog open={showDialog} onOpenChange={setShowDialog} >
        <DialogTrigger asChild>
            <Button className='bg-purple-600 text-white rounded-full py-6 text-lg hover:bg-purple-800 w-full'>
                <Plus className="w-7 h-4"/>
                Add social network
            </Button>
        </DialogTrigger>
        <DialogContent>

            <DialogHeader>
            <DialogTitle>Add new social network</DialogTitle>
            <div className=' grid gap-4 py-4 '>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField control={form.control} name="icon" render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Select your icon</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={(value) => {
                                        field.onChange(value)
                                        const selectedLink = linksSocialNetwork.find((link) => link.icon === value)
                                        if (selectedLink) {
                                            form.setValue("name", selectedLink.name)
                                        }
                                    }} value={field.value || ""} className="grid grid-cols-4 space-x-1">
                                        {linksSocialNetwork.map((link) => (
                                            <FormItem key={link.icon} className="flex items-center gap-1 space-x-0 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value={link.icon} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    <Image src={link.icon} alt={"icon"} width={40} height={40} />
                                                </FormLabel>
                                            </FormItem>
                                        ))}
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                        
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="URL" {...field} />
                                    </FormControl>
                                   
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Social network name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name will be auto-filled" {...field} />
                                    </FormControl>
                                   
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        
                        <Button type="submit" className="w-full rounded-full bg-violet-500 ">Create new social network</Button>
                    </form>
                </Form>
            </div>
            </DialogHeader>

        </DialogContent>
    </Dialog>
    </div>
  )
  

}
