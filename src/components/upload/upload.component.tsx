// components/UploadLogo.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Camera } from "lucide-react";
import Image from "next/image";

const imageSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "File must be an image",
  });

export default function Upload({
  onUploaded,
  ownerId,
  url,
}: {
  onUploaded?: (url: string) => void;
  ownerId: number;
  url?: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  console.log("preview", preview);
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("logo", file);
    if (ownerId) formData.append("user_id", ownerId.toString());

    setUploading(true);
    try {
      const res = await fetch("http://localhost:5000/setting/upload-logo", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onUploaded?.(data.url); // `url` will be used to store in DB
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
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
