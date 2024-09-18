"use client";
import React, { useEffect, useMemo, useState } from 'react';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

// Utility function to generate random data
const generateRandomData = (numRows: number) => {
  const categories = ['Category A', 'Category B', 'Category C'];
  const subCategories = ['Subcat 1', 'Subcat 2', 'Subcat 3'];

  return Array.from({ length: numRows }, () => ({
    category: categories[Math.floor(Math.random() * categories.length)],
    subCategory: subCategories[Math.floor(Math.random() * subCategories.length)],
    value1: Math.floor(Math.random() * 1000), // Random number between 0-999
    value2: Math.floor(Math.random() * 5000), // Random number between 0-4999
  }));
};

// Define the shape of our data
interface Data {
  category: string;
  subCategory: string;
  value1: number;
  value2: number;
}

const TanStackTableComponent: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);

  // Generate random data only after the component mounts (client-side)
  useEffect(() => {
    setData(generateRandomData(4));
  }, []);

  // Create a column helper for defining columns
  const columnHelper = createColumnHelper<Data>();

  // Define the columns for the table
  const columns: ColumnDef<Data>[] = useMemo(
    () => [
      columnHelper.accessor('category', {
        header: 'Category',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('subCategory', {
        header: 'Sub Category',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('value1', {
        header: 'Value 1',
        cell: (info) => info.getValue().toLocaleString(), // Format as number
      }),
      columnHelper.accessor('value2', {
        header: 'Value 2',
        cell: (info) => info.getValue().toLocaleString(), // Format as number
      }),
    ],
    []
  );

  // Create the table instance using the `useReactTable` hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1>TanStack Table with Random Data</h1>
      <table style={{ border: '1px solid black', width: '100%', marginTop: '20px' }} >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ padding: '10px', background: '#f0f0f0', borderBottom: 'solid 3px red' }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ padding: '10px', border: 'solid 1px gray' }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanStackTableComponent;
