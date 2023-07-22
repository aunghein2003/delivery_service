"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

//form event and auth
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

//ui components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

//login form validation
const loginCredentialsSchema = z.object({
  code: z.string().max(5, { message: "Code is only five characters" }),
  password: z.string(),
});

type loginCredentials = z.infer<typeof loginCredentialsSchema>;

//component
export default function AuthComponent() {
  const router = useRouter();

  const form = useForm<loginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
  });

  const { mutate: loginHandler, isLoading } = useMutation({
    mutationFn: async ({ code, password }: loginCredentials) => {
      const res = await signIn("credentials", {
        redirect: false,
        code,
        password,
      });
      if (res && !res.error) {
        router.push("/biker");
      } else {
        toast.error(res?.error!);
      }
    },
  });

  return (
    <div className="p-5 min-h-screen bg-slate-800">
      <div className="relative max-w-2xl mx-auto mt-[10vh] p-5 rounded-lg shadow-lg bg-white">
        {isLoading ? (
          <div className="absolute top-1/2 left-0 right-0 flex justify-center">
            <Loader2 className="w-16 h-16 animate-spin text-slate-600/70" />
          </div>
        ) : null}

        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <Image
            src={"/logo.jpg"}
            alt="Logo"
            width={200}
            height={200}
            priority
          />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              loginHandler(data);
            })}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-2/3 sm:ml-[15%]">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
