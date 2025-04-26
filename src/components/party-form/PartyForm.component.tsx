"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { PartyFormT, PartyFormSchema } from "@/types/party.type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation } from "@tanstack/react-query";
import { addParty } from "@/api/parties";
import { useAuth } from "@/hooks/useAuth";

type tabOptions = "addresses" | "gstDetails";

type PartyFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PartyForm = ({ open, setOpen }: PartyFormProps) => {
  const { ownerId } = useAuth();
  const [currentTab, setCurrentTab] = useState<tabOptions>("gstDetails");
  const form = useForm<PartyFormT>({
    resolver: zodResolver(PartyFormSchema),
    defaultValues: {
      name: "",
      contact_number: "",
      billing_address: "",
      email_address: "",
      gstin: "09AAACH7409R1ZZ",
      state: "kerala",
      opening_balance: "",
      // as_of_date: new Date(),
      receivable: false,
      gst_type: "unregisterd",
    },
  });

  const mutation = useMutation({
    mutationFn: addParty,
    onSuccess: () => {
      console.log("here");
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  });
  function onSubmit(values: PartyFormT) {
    console.log("submitted!!!!");
    console.log(values);

    if (!ownerId) {
      console.log("owner id missing");
      return;
    }
    mutation.mutate({ ...values, user_id: ownerId });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="">
        <DialogTitle className="text-2xl font-medium">
          Add New Party
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 h-[600px] overflow-y-scroll p-1"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--invent-gray)] text-lg">
                    Party Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="swastik steels" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gstin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[var(--invent-gray)] text-lg">
                    GSTIN
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex flex-col gap-2">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="opening_balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Opening Balance
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter opening balance"
                          {...field}
                          value={field.value as string}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="as_of_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        As of Date
                      </FormLabel>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="receivable"
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Receivable</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tabs
              className="w-full "
              value={currentTab}
              onValueChange={(value) => setCurrentTab(value as tabOptions)}
            >
              <TabsList className="w-full">
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="gstDetails">GST Details</TabsTrigger>
              </TabsList>
              <TabsContent value="addresses">
                <FormField
                  control={form.control}
                  name="billing_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Billing Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Email address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent className="flex flex-col gap-4" value="gstDetails">
                <FormField
                  control={form.control}
                  name="gst_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="unregisterd">
                            Unregisterd/Consumer
                          </SelectItem>
                          <SelectItem value="regular">
                            Registerd-Regular
                          </SelectItem>
                          <SelectItem value="composite">
                            Registerd-Composite
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="haryana">Haryana</SelectItem>
                          <SelectItem value="bihar">Bihar</SelectItem>
                          <SelectItem value="kerala">Kerala</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Button type="submit">add</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PartyForm;
