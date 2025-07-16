import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "./registerChartJS";

import PropTypes from "prop-types";

export default function PieChartGenerator({ onGenerate }) {
  const [labels, setLabels] = useState([""]);
  const [values, setValues] = useState([""]);

  const handleLabelChange = (idx, val) => {
    const newLabels = [...labels];
    newLabels[idx] = val;
    setLabels(newLabels);
  };

  const handleValueChange = (idx, val) => {
    const newValues = [...values];
    newValues[idx] = val.replace(/[^\d.]/g, "");
    setValues(newValues);
  };

  const addRow = () => {
    setLabels([...labels, ""]);
    setValues([...values, ""]);
  };

  const removeRow = idx => {
    setLabels(labels.filter((_, i) => i !== idx));
    setValues(values.filter((_, i) => i !== idx));
  };

  const pieData = {
    labels: labels.filter(l => l.trim() !== ""),
    datasets: [
      {
        data: labels.map((_, idx) => Number(values[idx]) || 0),
        backgroundColor: [
          "#36A2EB", "#FFCE56", "#FF6384", "#8BC34A", "#E91E63", "#FFC107", "#00BCD4", "#9C27B0"
        ]
      }
    ]
  };

  React.useEffect(() => {
    if (onGenerate && pieData.labels.length > 0 && pieData.datasets[0].data.some(v => v > 0)) {
      onGenerate(pieData);
    }
  }, [labels, values]);

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">पाई चार्ट जनरेटर</h2>
      <form className="space-y-4">
        {labels.map((label, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder={`लेबल ${idx + 1}`}
              className="input flex-1"
              value={label}
              onChange={e => handleLabelChange(idx, e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="मान"
              className="input w-24"
              value={values[idx]}
              onChange={e => handleValueChange(idx, e.target.value)}
              required
            />
            {labels.length > 1 && (
              <button type="button" className="text-red-500 px-2" onClick={() => removeRow(idx)}>
                ×
              </button>
            )}
          </div>
        ))}
        <button type="button" className="bg-blue-500 text-white px-4 py-1 rounded" onClick={addRow}>
          और जोड़ें
        </button>
      </form>
      <div className="mt-8">
        <Pie data={pieData} />
      </div>
    </div>
  );
}
