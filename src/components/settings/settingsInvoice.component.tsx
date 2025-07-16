"use client";
import { getAllTemplates, update } from "@/api/settings";
import { SettingsT, TemplateT } from "@/types/settings.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { FaCheckCircle } from "react-icons/fa";
type SettingsInvoiceProps = {
  settings: SettingsT;
};

const SettingsInvoice = ({ settings }: SettingsInvoiceProps) => {
  const [isPreviewDialogOpen, togglePreviewDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateT | null>(
    null,
  );
  const { data: templates, isLoading } = useQuery({
    queryFn: getAllTemplates,
    queryKey: ["templates"],
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: update,
    mutationKey: ["settings"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  const handleSubmit = () => {
    if (!selectedTemplate) return;
    const newSettings = settings;
    newSettings.template_id = selectedTemplate.id;

    mutation.mutate(newSettings);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {templates?.map((template) => (
        <div
          key={template.id}
          onClick={() => {
            togglePreviewDialog(true);
            setSelectedTemplate(template);
          }}
          className="group relative rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-md transition duration-200 cursor-pointer"
        >
          <Image
            src={"http://localhost:5000" + template.thumbnail}
            alt={template.name || `template_${template.id}`}
            className="w-full h-auto object-cover"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 250px"
          />

          {settings.template_id === template.id && (
            <div className="absolute text-green-400 top-1 right-2 opacity-50">
              <FaCheckCircle />
            </div>
          )}

          {/* Hover overlay for template name */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center font-medium py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {template.name || `Template ${template.id}`}
          </div>
        </div>
      ))}

      <Dialog open={isPreviewDialogOpen} onOpenChange={togglePreviewDialog}>
        <DialogContent>
          <DialogTitle>Preview</DialogTitle>

          {selectedTemplate && (
            <>
              <Image
                src={"http://localhost:5000" + selectedTemplate.thumbnail}
                alt={selectedTemplate.name || `template_${selectedTemplate.id}`}
                className="w-full h-auto object-fit"
                width={0} // Required for next/image but overridden by class
                height={0}
                sizes="(max-width: 768px) 100vw, 350px"
              />

              <Button
                disabled={settings.template_id === selectedTemplate.id}
                onClick={() => {
                  handleSubmit();
                  togglePreviewDialog(false);
                }}
              >
                {settings.template_id !== selectedTemplate.id
                  ? "Make it default"
                  : "Your default template"}
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsInvoice;
