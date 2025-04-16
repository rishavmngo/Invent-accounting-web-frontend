"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

const CredentialsSchema = z.object({
  email: z.string().email("Invalid email format"),
  fullName: z.string(),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password must contain at least 8 characters"),
});

const RegistrationForm = () => {
  const form = useForm<z.infer<typeof CredentialsSchema>>({
    resolver: zodResolver(CredentialsSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    },
  });
  function onSubmit(values: z.infer<typeof CredentialsSchema>) {
    console.log(values);
  }
  return (
    <section className="px-10 w-full flex flex-col">
      <header className="flex flex-col items-center mb-18">
        <span className="mb-12">
          <Image
            src="/invent_logo_gray.svg"
            alt="logo"
            width={72}
            height={80}
          />
        </span>
        <section>
          <span className="">
            <h2 className="text-[2rem] font-medium text-[var(--invent-gray)]">
              Welcome to Invent
            </h2>
            <h3 className="text-sm text-[var(--invent-text-muted)]">
              Enter your email and password to continue
            </h3>
          </span>
        </section>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="ram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="ram@gmail.com" {...field} />
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
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[var(--invent-gray)]">
            Sign Up
          </Button>
        </form>
      </Form>
      <span className="relative w-full flex items-center justify-center my-6">
        <p className="bg-white z-10 px-6 text-[#AAAAAA] text-sm ">
          or sign up with
        </p>
        <div
          style={{ borderTop: "0.8px solid #AAAAAA" }}
          className="absolute top-1/2 w-full transform -translate-y-1/2"
        />
      </span>
      <Button className="">
        <FaGoogle /> Sign up with Google
      </Button>

      <span className="flex items-center justify-center my-8 gap-2 text-base">
        <p className="text-[var(--invent-text-muted)]">
          Already have an account?
        </p>
        <Link href="/login">Login</Link>
      </span>
    </section>
  );
};

export default RegistrationForm;
