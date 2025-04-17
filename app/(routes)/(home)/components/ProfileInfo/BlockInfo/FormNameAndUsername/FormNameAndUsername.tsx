"use client"

import { useUserInfo } from "@/hooks/useUser";
import { FormNameAndUsernameProps } from "./FormNameAndUsername.types";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "./FormNameAndUsername.form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";

// Función para remover acentos/tildes
const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function FormNameAndUsername(props: FormNameAndUsernameProps) {
    const {setOpenDialog} = props
    const {user, reloadUser} = useUserInfo()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: user?.username || "",
          name : user?.name || "",
          bio: user?.bio || "",
        },
      })
     
      // Observar cambios en el campo username para eliminar tildes
      useEffect(() => {
        const subscription = form.watch((value, { name }) => {
          if (name === 'username') {
            const cleanUsername = removeAccents(value.username || '');
            if (cleanUsername !== value.username) {
              form.setValue('username', cleanUsername);
            }
          }
        });
        
        return () => subscription.unsubscribe();
      }, [form]);
     
      // 2. Define a submit handler.
      const onSubmit=async (values: z.infer<typeof formSchema>) => {
        try {
            // Asegurarse de que el username no tenga tildes al enviar
            const cleanUsername = removeAccents(values.username || '');
            
            await axios.patch("/api/update-user", {
                name: values.name,
                username: cleanUsername,
                bio: values.bio,
            })
            setOpenDialog(false)
            reloadUser()
            toast.success("Values updated!")
            form.reset()
        } catch (error) {
            console.log(error)
        }
      }
    
  return (
    <div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input 
                  placeholder="@profile" 
                  {...field} 
                  onChange={(e) => {
                    // Eliminar tildes al escribir
                    const value = removeAccents(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-purple-600 rounded-full w-full py-6 text-lg hover:bg-purple-800" >Save</Button>
      </form>
    </Form>
    </div>
  )
}