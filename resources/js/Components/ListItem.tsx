import Checkbox from "./Checkbox";
import { Inertia } from "@inertiajs/inertia";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

interface Item {
  name: string;
  price: string;
  type: string;
  id: number;
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItems: number[];
}

interface ListItemProps {
  name: string;
  price: string;
  type: string;
  index: number;
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItems: number[];
}

function deleteRow(index: number): void {
  router.delete(route("shoppinglist.destroy", { shoppinglist: index }));
}

const ListItem: React.FC<ListItemProps> = ({
  name,
  price,
  type,
  index,
  setSelectedItems,
  selectedItems,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  function selectRow(): void {
    if (!isChecked === true) {
      setSelectedItems((s) => {
        return [...s, index];
      });
    } else {
      const selectedIndex = selectedItems.indexOf(index);
      const selected = [...selectedItems];
      if (selectedIndex !== -1) {
        selected.splice(selectedIndex, 1);
        setSelectedItems(selected);
      }
    }
  }

  return (
    <tr
      key={index}
      className={`border-t border-gray-200 ${isChecked ? "line-through" : ""}`}
      onClick={() => {
        setIsChecked((checked) => !checked);
        selectRow();
      }}
    >
      <td className="border-r border-gray-400 px-4 text-left">{name}</td>
      <td className="border-r border-gray-400 px-4 text-right">{price}</td>
      <td className=" border-r border-gray-400 px-4 text-center">{type}</td>
      <td className="px-4">
        <Checkbox id={index} checked={isChecked} readOnly={true} />
      </td>
    </tr>
  );
};

export default ListItem;
