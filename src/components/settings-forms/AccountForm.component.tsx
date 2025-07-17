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
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update } from "@/api/settings";
import { LoadingSpinner } from "../loading-spinner.component";

type AccountFormProps = {
  settings: SettingsT;
};

const AccountDetailSchema = z.object({
  name: z.string().optional(),
  contact_number: z.string().optional(),
  address: z.string().optional(),
  website: z.string().optional(),
});

const AccountForm = ({ settings }: AccountFormProps) => {
  const form = useForm({
    resolver: zodResolver(AccountDetailSchema),
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

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: update,
    mutationKey: ["settings"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
  const handleSubmit = (data: z.infer<typeof AccountDetailSchema>) => {
    const newSettings = settings;
    newSettings.name = data.name ? data.name : null;
    newSettings.contact_number = data.contact_number
      ? data.contact_number
      : null;
    newSettings.address = data.address ? data.address : null;
    newSettings.website = data.website ? data.website : null;

    mutation.mutate(newSettings);
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4"
        >
          <Button
            className="self-end"
            disabled={!form.formState.isDirty || mutation.isSuccess}
            type="submit"
          >
            Save changes
            {mutation.isPending && <LoadingSpinner />}
          </Button>
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
