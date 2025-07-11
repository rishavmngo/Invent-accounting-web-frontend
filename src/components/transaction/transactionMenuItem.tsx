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
    <span
      className="flex flex-col gap-2 items-center cursor-pointer border border-transparent group"
      {...rest}
    >
      <Icon size="2em" className="text-gray-600 group-hover:text-black" />
      <p className="text-gray-600 group-hover:text-black ">{name}</p>
    </span>
  );
};

export default TransactionMenuItem;
