"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css"; // Import default CSS
import { PivotTable } from "react-pivottable";

const PivotTableComponent = () => {
  const [data, setData] = useState([]);
  const [pivotState, setPivotState] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // Treat the first row as headers
      dynamicTyping: true, // Auto-detect numbers
      complete: function (results) {
        setData(results.data);
      },
    });
  };

  return (
    <div>
      <h1>Pivot Table Component</h1>

      {/* File input for CSV */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {/* Show pivot table if data is loaded */}
      {data.length > 0 && (
        <PivotTableUI
          data={data}
          onChange={(s) => setPivotState(s)}
          {...pivotState}
        />
      )}
    </div>
  );
};

export default PivotTableComponent;
