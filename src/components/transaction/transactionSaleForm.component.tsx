"use client";
import React, { SetStateAction, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdAddCircle } from "react-icons/io";
import TransactionSaleItemAddForm from "./transactionSaleItemAddForm.component";
import { Autocomplete } from "../autocomplete/autocompleteInput.component";
import { suggestion } from "@/api/parties";
import { Party } from "@/types/party.type";
import { saleFormBaseSchema, saleFormBaseT } from "@/types/transaction.type";

async function fetchPartySuggesion(query: string): Promise<Party[]> {
  const data = await suggestion(query);
  return data as Party[];
}

type TransactionSaleFormProps = {
  open: boolean;
  toggleOpen: React.Dispatch<SetStateAction<boolean>>;
};
const TransactionSaleForm = (props: TransactionSaleFormProps) => {
  const [formStage, setFormStage] = useState<"saleMain" | "addItem">(
    "saleMain",
  );
  const form = useForm({
    resolver: zodResolver(saleFormBaseSchema),
    defaultValues: {
      customer_name: "",
      customer_id: null,
      contact_number: "",
    },
  });

  const handleSecondFormClose = () => {
    setFormStage("saleMain");
  };
  const onSubmit = (data: saleFormBaseT) => {
    console.log(data);
  };
  return (
    <Dialog open={props.open} onOpenChange={props.toggleOpen}>
      here
      <DialogContent hideClose={formStage != "saleMain"}>
        {formStage == "saleMain" ? (
          <>
            <DialogTitle className="text-2xl font-medium">Sale</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 h-[600px] overflow-y-auto p-1"
              >
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <>
                      <Autocomplete
                        fetchSuggestionsAction={fetchPartySuggesion}
                        onSelectAction={(party: Party) => {
                          field.onChange(party.name);
                          form.setValue("customer_id", party.id);
                        }}
                        inputKey="name"
                        setInpAction={(value) => {
                          field.onChange(value);
                        }}
                        onTypingStart={() => {
                          form.setValue("customer_id", null);
                        }}
                        value={field.value as string}
                        getOptionLabelAction={(party) => <p>{party.name}</p>}
                      />
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--invent-gray)] text-lg">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} value={field.value} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setFormStage("addItem");
                  }}
                >
                  <IoMdAddCircle />
                  Add Items
                </Button>

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </>
        ) : (
          <TransactionSaleItemAddForm handleClose={handleSecondFormClose} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionSaleForm;
