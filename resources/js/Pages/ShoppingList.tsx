import React, { MouseEventHandler, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import { useForm, Head } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import ListItem from "@/Components/ListItem";
import SecondaryButton from "@/Components/SecondaryButton";
import { Inertia } from "@inertiajs/inertia";
import { route } from "ziggy-js";
import { router } from "@inertiajs/react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import NutritionChart from "@/Components/NutritionChart";

import { Pie } from "react-chartjs-2";
import IconButton from "@/Components/IconButton";

// Define type for item object
interface Item {
  name: string;
  price: string;
  type: string;
  id: number;
}

// Define props type for ShoppingTable component
interface ShoppingTableProps {
  list: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  selectedItems: number[];
}

interface CategoryTableProps {}

// Define props type for Index component
interface IndexProps {
  auth: any; // Adjust this type according to your auth object type
  items: Item[];
}

interface TypeCounts {
  [key: string]: number;
}

function updateGraph(items: Item[]) {
  const typeCounts: any = {
    Produce: 0,
    Bakery: 0,
    "Dairy/Eggs": 0,
    "Nuts/Cereal": 0,
    "Meat/Fish": 0,
    "Snacks/Sweets": 0,
    "Fats/Sauces": 0,
  };
  items.forEach((item) => {
    if (item.type in typeCounts) {
      typeCounts[item.type]++;
    } else {
      typeCounts[item.type] = 1;
    }
  });

  const labels = Object.keys(typeCounts).filter((type) => {
    return type !== "Household" && type !== "Drinks" && type !== "Frozen";
  });

  const data = labels.map((label) => typeCounts[label]);
  return data;
}

ChartJS.register(ArcElement, Tooltip);

const Index: React.FC<IndexProps> = ({ auth, items }) => {
  const itemNameInputRef = React.useRef<HTMLInputElement>(null);
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
  const [priceState, setPriceState] = React.useState("");

  const { data, setData, post, processing, reset, errors } = useForm<{
    itemName: string;
    itemPrice: string;
    itemType: string;
  }>({
    itemName: "",
    itemPrice: "-",
    itemType: "",
  });

  const chartDataDennis = useMemo(() => {
    return updateGraph(items);
  }, [items]);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-1 bg-gray-100">
      <div
        className="left-column flex-col justify-center md:h-full md:min-h-[100vh]"
        style={{ backgroundColor: "lightblue" }}
      >
        <div className="text-center flex flex-col gap-2 justify-center">
          <strong className="text-2xl"> Shopping List </strong>
          <div className="mb-4 mt-4 flex justify-center">
            <ShoppingTable
              list={items}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
            />
          </div>
          <div className="w-full flex justify-center h-40 md:h-64 pb-8">
            <div>
              <NutritionChart
                items={items}
                chartData={chartDataDennis}
              ></NutritionChart>
            </div>
          </div>
        </div>
      </div>
      <div className="right-column flex flex-col justify-center items-center md:h-screen min-h-[70vh]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            post(route("shoppinglist.store"), {
              onSuccess: () => {
                reset();
              },
            });
            setPriceState("");
            itemNameInputRef.current?.focus();
          }}
        >
          <div className="mb-4 mt-1 ml-4 items-center">
            <TextInput
              id="itemName"
              type="text"
              ref={itemNameInputRef}
              value={data.itemName}
              placeholder="Item Name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                setData("itemName", event.target.value)
              }
            />
          </div>
          <div className="mb-4 ml-4">
            <TextInput
              id="itemPrice"
              type="text"
              value={priceState}
              placeholder="Cost"
              onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                setPriceState(event.target.value);
                setData("itemPrice", event.target.value);
              }}
            />
          </div>
          <div className="grid ml-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-4 gap-1 items-center justify-center">
            <div>
              <IconButton
                title="Bakery"
                source="https://cdn-icons-png.flaticon.com/512/4241/4241664.png"
                setData={setData}
              ></IconButton>
            </div>
            <div>
              <IconButton
                title="Produce"
                source="https://cdn-icons-png.flaticon.com/512/3362/3362707.png"
                setData={setData}
              ></IconButton>
            </div>
            <div>
              <IconButton
                title="Dairy/Eggs"
                source="https://cdn-icons-png.flaticon.com/512/7438/7438589.png"
                setData={setData}
              ></IconButton>
            </div>
            <div>
              <IconButton
                title="Nuts/Cereal"
                source="https://cdn-icons-png.flaticon.com/512/5312/5312850.png"
                setData={setData}
              ></IconButton>
            </div>

            <div>
              <IconButton
                title="Meat/Fish"
                source="https://cdn-icons-png.flaticon.com/512/1046/1046769.png"
                setData={setData}
              ></IconButton>
            </div>

            <div>
              <IconButton
                title="Drinks"
                source="https://cdn-icons-png.freepik.com/512/7254/7254781.png"
                setData={setData}
              ></IconButton>
            </div>

            <div>
              <IconButton
                title="Frozen"
                source="https://cdn-icons-png.flaticon.com/512/1073/1073339.png"
                setData={setData}
              ></IconButton>
            </div>

            <div>
              <IconButton
                title="Snacks/Sweets"
                source="https://cdn-icons-png.flaticon.com/512/3814/3814614.png"
                setData={setData}
              ></IconButton>
            </div>
            <div>
              <IconButton
                title="Fats/Sauces"
                source="https://cdn-icons-png.flaticon.com/256/5862/5862680.png"
                setData={setData}
              ></IconButton>
            </div>
            <div>
              <IconButton
                title="Household"
                source="https://cdn-icons-png.flaticon.com/512/1059/1059251.png"
                setData={setData}
              ></IconButton>
            </div>
          </div>
          <div className="justify-end content-center w-full mt-10 flex">
            <SecondaryButton
              disabled={false}
              type="button"
              className="mr-2 justify-end"
              onClick={(e) => {
                Inertia.post(route("shoppinglist.massDelete"), {
                  selectedItems,
                });
              }}
            >
              {" "}
              Clear Selected{" "}
            </SecondaryButton>
            <SecondaryButton
              disabled={false}
              className="mr-2 justify-end"
              type="button"
              onClick={() => {
                Inertia.delete(route("shoppinglist.clear"));
              }}
            >
              {" "}
              - Clear All -{" "}
            </SecondaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

const ShoppingTable: React.FC<ShoppingTableProps> = ({
  list,
  setSelectedItems,
  selectedItems,
}: ShoppingTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="border-b border-gray-400 px-4 py-2">
            <button
              onClick={(e) => {
                Inertia.get(route("shoppinglist.sort", { sortBy: "name" }));
              }}
            >
              Name
            </button>
          </th>
          <th className="border-b border-gray-400 px-4 py-2">
            <button
              onClick={(e) => {
                Inertia.get(route("shoppinglist.sort", { sortBy: "price" }));
              }}
            >
              Price
            </button>
          </th>
          <th className="border-b border-gray-400 px-4 py-2">
            <button
              onClick={(e) => {
                Inertia.get(route("shoppinglist.sort", { sortBy: "type" }));
              }}
            >
              Type
            </button>
          </th>
          <th className="border-b border-gray-400 px-4 py-2">✓</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <ListItem
            name={item.name}
            price={item.price}
            key={index}
            index={item.id}
            type={item.type}
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Index;
