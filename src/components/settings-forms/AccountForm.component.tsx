"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { SettingsT } from "@/types/settings.type";

type AccountFormProps = {
  settings: SettingsT;
};

const AccountForm = ({ settings }: AccountFormProps) => {
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
      contact_number: "",
      address: "",
      website: "",
    },
  });

  useEffect(() => {
    form.reset({
      name: settings.name ? settings.name : "",
      contact_number: settings.contact_number ? settings.contact_number : "",
      address: settings.address ? settings.address : "",
      website: settings.website ? settings.website : "",
    });
  }, [settings]);

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col gap-4">
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
