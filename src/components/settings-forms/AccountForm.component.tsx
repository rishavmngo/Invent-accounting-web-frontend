"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const AccountForm = () => {
  const form = useForm({
    resolver: zodResolver(
      z.object({
        name: z.string().optional(),
        contact_number: z.string().optional(),
        address: z.string().optional(),
        website: z.string().optional(),
      }),
    ),
    defaultValues: {
      name: "",
    },
  });

  return (
    <div>
      <Form {...form}>
        <form className="">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Business Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Ex: Xyz electonics"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Contact number
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Ex: +ab xxxxx"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Address
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Ex: xyz building.."
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[var(--invent-gray)] text-lg">
                  Website
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Ex: example.com"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default AccountForm;
