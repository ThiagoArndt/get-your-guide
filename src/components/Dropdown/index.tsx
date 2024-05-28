"use client";
import React, { ReactElement, forwardRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownProps {
  icon?: ReactElement<any, any>;
  options: string[];
  title?: string;
  setInput?: React.Dispatch<React.SetStateAction<any | null>>;
  input?: string | null;
}

const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>((props, ref) => {
  const { setInput, input, icon, options, title, ...rest } = props;

  const handleSelectOption = (option: string) => {
    if (setInput) {
      if (option) setInput(option);
    }
  };

  return (
    <div className="w-full">
      <h1 className="px-2 font-bold py-1">{title ?? null}</h1>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          ref={ref}
          {...rest}
          className="flex flex-row px-2 gap-3 py-4 w-full border-2 rounded-xl border-solid border-black text-lg"
        >
          {icon ?? null}
          {input != null && input != "" ? input : <h1>Selecione um usuário</h1>}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-background border border-black rounded-2xl p-2 mt-1 shadow-lg w-[530px]">
          {options.map((item) => {
            return (
              <DropdownMenu.Item
                key={item}
                className="p-2 w-full outline-none hover:bg-gray-200 cursor-pointer"
                onSelect={() => handleSelectOption(item)}
              >
                {item}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
});

export default Dropdown;
