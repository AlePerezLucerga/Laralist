import React from "react";
import { Pie } from "react-chartjs-2";

interface NutritionChartProps {
  items: Object[];
  chartData: number[];
}

const NutritionChart: React.FC<NutritionChartProps> = ({
  items,
  chartData,
}) => {
  const NutritionData = {
    labels: [
      "Produce",
      "Bakery",
      "Dairy/Eggs",
      "Nuts/Grains",
      "Meat/Fish",
      "Snacks/Sweets",
      "Fats/Sauces",
    ],
    datasets: [
      {
        data: [50, 25, 15, 2, 5, 1, 2],
        backgroundColor: [
          "green",
          "orangered",
          "beige",
          "brown",
          "red",
          "yellow",
          "pink",
        ],
      },
      {
        data: chartData,
        backgroundColor: [
          "green",
          "orangered",
          "beige",
          "brown",
          "red",
          "yellow",
          "pink",
        ],
      },
    ],
  };

  return <Pie data={NutritionData} className="md:w-64 w-40 h-40 md:h-64"></Pie>;
};

export default React.memo(NutritionChart);
