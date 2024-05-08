import { Inertia } from "@inertiajs/inertia";
import React from "react";

interface IconButtonProps {
  title: string;
  source: string;
  setData: any;
}

const IconButton: React.FC<IconButtonProps> = ({ title, source, setData }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        type="submit"
        onClick={(e) => {
          setData("itemType", title);
        }}
        className="inline-block"
      >
        <img src={source} alt={title} className="w-20 h-20" />
      </button>
      <div
        className={`absolute bottom-0 left-0 bg-black text-white px-2 py-1 rounded-md text-xs mt-1 ${
          !showTooltip && "invisible"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default IconButton;
