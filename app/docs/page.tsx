"use client";
import React, { useState } from 'react';
import Papa from 'papaparse';
import { tidy, summarize, sum, mean } from '@tidyjs/tidy';
import styles from './page.module.css';

const DocsPage = () => {
  const [totalPct, setTotalPct] = useState(null);

  const handleButtonClick = () => {
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

            // Use tidy.js to tally the 'pct' column
            const tally = tidy(
              data,
              summarize({
                totalPct: mean((d) => parseFloat(d.pct) || 0), // Sum the 'pct' column
              })
            );

            // Set the total Pct in state
            setTotalPct(tally[0].totalPct);
          },
          error: function (error) {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch((error) => console.error('Error fetching the file:', error));
  };

  return (
    <div >
      <h2>Average the Pct Column from Senate Historical Data</h2>
      <button className={styles.button} onClick={handleButtonClick}>Average Pct Column</button>
      {totalPct !== null && <p>Average Pct: {totalPct.toFixed(2)}</p>}
    </div>
  );
};

export default DocsPage;
