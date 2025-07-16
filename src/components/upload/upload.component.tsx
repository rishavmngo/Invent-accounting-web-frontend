// components/UploadLogo.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Camera } from "lucide-react";
import Image from "next/image";
import { uploadLogo } from "@/api/settings";
import { useQueryClient } from "@tanstack/react-query";
import { SettingsT } from "@/types/settings.type";

type UploadProps = {
  onUploaded?: (url: string) => void;
  ownerId: number;
  url?: string | null;
  setting: SettingsT;
};
const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
  });

export default function Upload({ onUploaded, ownerId, url }: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (url) setPreview("http://localhost:5000" + url);
  }, [url]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const result = imageSchema.safeParse(selected);
    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("logo", file);
    if (ownerId) formData.append("user_id", ownerId.toString());

    setUploading(true);
    try {
      const res = await uploadLogo(formData);

      queryClient.invalidateQueries({ queryKey: ["settings"] });
      console.log(res);
    } finally {
      setUploading(false);
    }
  };
  const triggerInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col items-center gap-4">
        <Input
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <div
          onClick={triggerInput}
          className="relative cursor-pointer w-32 h-32 rounded-full  border border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-100 hover:shadow-md transition"
        >
          {preview ? (
            <Image
              width={100}
              height={100}
              src={preview}
              alt="Logo Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <Camera className="text-gray-400 w-8 h-8" />
          )}
        </div>
        <Button disabled={!file || uploading} onClick={handleUpload}>
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}
