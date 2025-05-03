import React from "react";

type InventoryEntityCardProps = {
  name: string;
  purchase_price?: number;
  sell_price?: number;
} & React.HTMLAttributes<HTMLLIElement>;

const InventoryEntityCard = ({
  name,
  purchase_price,
  sell_price,
  ...props
}: InventoryEntityCardProps) => {
  return (
    <li
      {...props}
      tabIndex={2}
      className="group flex flex-col gap-4 px-5 py-2 text-sm rounded-md bg-[#F5F5F5] cursor-pointer rainbow-border-wrapper "
    >
      <h2 className="font-medium text-xl text-[#4E4E4E]">{name}</h2>
      <ul className="flex gap-8 ">
        <li>
          <div className="text-[#707070] text-sm">In Stock</div>
          <div className="font-medium text-[#464646]">30</div>
        </li>
        <li>
          <div className="text-[#707070] text-sm">Purchase Price</div>
          <div className="">{purchase_price}</div>
        </li>

        <li>
          <div className="text-[#707070] text-sm">Sell Price</div>
          <div className="flex items-center text-[#464646]">{sell_price}</div>
        </li>
      </ul>
    </li>
  );
};

export default InventoryEntityCard;
