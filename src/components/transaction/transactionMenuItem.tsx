import React from "react";
import { IconType } from "react-icons";

type TransactionMenuItemProps = {
  name: string;
  Icon: IconType;
} & React.HTMLAttributes<HTMLSpanElement>;

const TransactionMenuItem = ({
  name,
  Icon,
  ...rest
}: TransactionMenuItemProps) => {
  return (
    <button
      className="flex flex-col items-center gap-2 cursor-pointer border border-transparent group p-2 hover:bg-gray-200 rounded"
      type="button"
      {...rest}
    >
      <Icon size="2em" className="text-gray-600 group-hover:text-black" />
      <p className="text-gray-600 group-hover:text-black ">{name}</p>
    </button>
  );
};

export default TransactionMenuItem;
