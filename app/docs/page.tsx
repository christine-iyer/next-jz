"use client";

import React, { useState } from 'react';
import Papa from 'papaparse';
import { tidy, summarize, sum, n, mean } from '@tidyjs/tidy';
import styles from './page.module.css';
const SenateTally = () => {
  const [totalPct, setTotalPct] = useState(null);
  const [recordCount, setRecordCount] = useState(null);
  const [csvData, setCsvData] = useState(null); // Store the parsed CSV data

  const handleFetchAndParse = () => {
    // Fetch the CSV file from the public folder
    fetch('./senateHistorical.csv')
      .then((response) => response.text())
      .then((csvData) => {
        // Parse the CSV data using PapaParse
        Papa.parse(csvData, {
          header: true, // Treat the first row as headers
          skipEmptyLines: true,
          complete: function (results) {
            const data = results.data;
            setCsvData(data); // Store the parsed data for reuse
          },
          error: function (error) {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch((error) => console.error('Error fetching the file:', error));
  };

  const handleTallyPct = () => {
    if (!csvData) {
      alert('Please load the data first.');
      return;
    }

    // Use tidy.js to tally the 'pct' column
    const average = tidy(
      csvData,
      summarize({
        totalPct: mean((d) => parseFloat(d.pct) || 0), // Sum the 'pct' column
      })
    );

    setTotalPct(average[0].totalPct);
  };

  const handleCountRecords = () => {
    if (!csvData) {
      alert('Please load the data first.');
      return;
    }

    // Use tidy.js to count the number of records
    const tally = tidy(
      csvData,
      summarize({
        recordCount: n(), // Count the number of rows
      })
    );

    setRecordCount(tally[0].recordCount);
  };

  return (
    <div>
      <h2>Tally Data from Senate Historical CSV</h2>
      <button className={styles.button} onClick={handleFetchAndParse}>Load Data</button>
      <br /><br />
      <button className={styles.button} onClick={handleTallyPct} disabled={!csvData}>Tally Pct Column</button>
      <button className={styles.button} onClick={handleCountRecords} disabled={!csvData}>Count Records</button>
      {totalPct !== null && <p>Total Pct: {totalPct.toFixed(0)}</p>}
      {recordCount !== null && <p>Record Count: {recordCount}</p>}
    </div>
  );
};

export default SenateTally;
