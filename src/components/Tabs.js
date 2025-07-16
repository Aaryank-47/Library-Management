import React from "react";

export default function Tabs({ tabs, active, onTabChange }) {
  return (
    <div className="flex border-b mb-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium border-b-2 transition-colors duration-150 focus:outline-none ${
            active === idx
              ? "border-blue-600 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => onTabChange(idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
