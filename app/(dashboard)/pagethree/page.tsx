"use client";
// src/components/PivotTableComponent.tsx
import React, { useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import Papa from "papaparse";
import { useTable, useFilters, useSortBy, Column } from "react-table";

// Dynamically import PivotTable to ensure it's only loaded on the client
const PivotTableUI = dynamic(() => import('react-pivottable/PivotTableUI'), { ssr: false });
import "react-pivottable/pivottable.css";

// Define the type of each row in your table
interface DataRow {
  [key: string]: any; // This allows flexibility with different CSV structures
}

const PivotTableComponent: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]); // Data parsed from CSV
  const [pivotState, setPivotState] = useState<any>({}); // Pivot table state

  // Handle CSV file upload and parse with PapaParse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Optional chaining for safety
    if (!file) return;

    Papa.parse<DataRow>(file, {
      header: true, // Treat the first row as headers
      dynamicTyping: true, // Automatically detect numbers and other types
      complete: function (results) {
        setData(results.data);
      },
    });
  };

  // Memoize columns for the react-table
  const columns: Column<DataRow>[] = useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            Header: key,
            accessor: key,
          }))
        : [],
    [data]
  );

  // react-table instance with sorting and filtering
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useFilters, // For filtering
    useSortBy // For sorting
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div>
      <h1>Pivot Table and Filterable, Sortable Table</h1>

      {/* File input for CSV */}
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {/* Show pivot table if data is loaded */}
      {data.length > 0 && (
        <>
          <h2>Pivot Table</h2>
          <PivotTableUI
            data={data}
            onChange={(s: any) => setPivotState(s)}
            {...pivotState}
          />

          <h2>Filterable and Sortable Table</h2>

          {/* Sortable and Filterable Table */}
          <table
            {...getTableProps()}
            style={{ border: "1px solid black", width: "100%", marginTop: "20px" }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                      style={{
                        borderBottom: "solid 3px red",
                        background: "aliceblue",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        key={cell.column.id}
                        style={{
                          padding: "10px",
                          border: "solid 1px gray",
                          background: "papayawhip",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PivotTableComponent;
