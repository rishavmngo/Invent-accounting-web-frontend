"use client";

import { ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export type AutocompleteProps<T> = {
  fetchSuggestionsAction: (query: string) => Promise<T[]>;
  onSelectAction: (item: T) => void;
  getOptionLabelAction: (item: T) => ReactNode;
  placeholder?: string;
  className?: string;
  inputKey: keyof T;
  value?: string;
  setInpAction: (value: string) => void;
  onTypingStart?: () => void;
};

export function Autocomplete<T>({
  fetchSuggestionsAction,
  onSelectAction,
  inputKey,
  getOptionLabelAction,
  placeholder = "Type to search...",
  className = "",
  value,
  setInpAction,
  onTypingStart,
}: AutocompleteProps<T>) {
  const [debouncedInput] = useDebounce(value as string, 300);
  const [isOpen, setIsOpen] = useState(false);

  const { data: options = [], isLoading } = useQuery({
    queryKey: ["autocomplete", debouncedInput],
    queryFn: () => fetchSuggestionsAction(debouncedInput),
    enabled: debouncedInput.length > 0,
  });

  return (
    <>
      <div className="relative">
        <Input
          value={value}
          onChange={(e) => {
            onTypingStart?.();
            setInpAction(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className={cn("w-full", className)}
        />

        {isOpen && (
          <div className="w-full p-0 absolute z-9999 bg-gray-100">
            {isLoading ? (
              <div className="p-2 text-sm text-gray-500">Loading...</div>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {options.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      onSelectAction(item);
                      setInpAction(item[inputKey] as string);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-100 text-sm"
                  >
                    {getOptionLabelAction(item)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
}
