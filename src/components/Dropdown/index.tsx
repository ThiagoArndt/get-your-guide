import React, { ReactElement } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DropdownProps {
  icon?: ReactElement<any, any>;
  options: string[];
  title?: string;
  setInput: React.Dispatch<React.SetStateAction<string | null>>;
  input: string | null;
}

function Dropdown(props: DropdownProps) {
  const { setInput, input, icon, options, title } = props;

  const handleSelectOption = (option: string) => {
    setInput(option);
  };

  return (
    <div className="w-full">
      <h1 className="px-2 font-bold py-1">{title ?? null}</h1>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex flex-row px-2 gap-3 py-4 w-full border-2 rounded-xl border-solid border-black text-lg">
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
}

export default Dropdown;
