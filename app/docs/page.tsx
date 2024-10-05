"use client";
import React, { useEffect, useState } from 'react';
import { tidy, groupBy, summarize, mean, n } from '@tidyjs/tidy';
import Papa from 'papaparse';

const PollTable = () => {
  const [pollData, setPollData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
const [cycle, setCycle] = useState('All');
  const [party, setParty] = useState('All');
  const [candidate, setCandidate] = useState('All');
  const [pollster, setPollster] = useState('All');
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  useEffect(() => {
    
    // Fetch and parse CSV file
    fetch('./senateHistorical.csv')
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data.map((d) => ({
              ...d,
              pct: parseFloat(d.pct) || 0, // Ensure pct is treated as a number
              end_date: new Date(d.end_date),

            }))
            .filter((d) => ['DEM', 'REP', 'IND'].includes(d.party)); // Static filter for DEM, REP, IND
           setPollData(parsedData);
           console.log(parsedData);
          },
        });
      });
  }, []);

  // Function to filter and group data
  const processData = () => {
    let filteredData = pollData;

    // Filter by cycle
    if (cycle !== 'All') {
      filteredData = filteredData.filter((d) => d.cycle === cycle);
    }

    // Filter by party
    if (party !== 'All') {
      filteredData = filteredData.filter((d) => d.party === party);
    }

    // Filter by candidate
    if (candidate !== 'All') {
      filteredData = filteredData.filter((d) => d.candidate_name === candidate);
    }
    // Filter by pollster
    if (pollster !== 'All') {
      filteredData = filteredData.filter((d) => d.pollster === pollster);
    }

    // Use Tidy.js to group and summarize the filtered data
    const output = tidy(
      filteredData,
      groupBy(['poll_id','end_date','candidate_name', 'state',  'pollster'], [
        summarize({
          n: n(),
          average: mean('pct'),
        }),
      ])
    );

    setGroupedData(output);
  };
  const desiredFields = [
    'poll_id', 'numeric_grade', 'pollster', 'methodology', 'transparency_score', 
    'state', 'end_date', 'sample_size', 'cycle', 'office_type', 
    'seat_number', 'seat_name', 'election_date', 'stage', 
    'party', 'pct', 'candidate_name'
  ];

  return (
    <div>
      <h2>Poll Data Table</h2>

      {/* Filters */}
      <div>
        <label>Cycle: </label>
        <select value={cycle} onChange={(e) => setCycle(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(pollData.map((d) => d.cycle))].map((cycle, idx) => (
            <option key={idx} value={cycle}>
              {cycle}
            </option>
          ))}
        </select>

        <label> Party: </label>
        <select value={party} onChange={(e) => setParty(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(pollData.map((d) => d.party))].map((party, idx) => (
            <option key={idx} value={party}>
              {party}
            </option>
          ))}
        </select>

        <label> Candidate: </label>
        <select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(pollData.map((d) => d.candidate_name))].map((candidate, idx) => (
            <option key={idx} value={candidate}>
              {candidate}
            </option>
          ))}
        </select>

        <label> Pollster: </label>
        <select value={pollster} onChange={(e) => setPollster(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(pollData.map((d) => d.pollster))].map((pollster, idx) => (
            <option key={idx} value={pollster}>
              {pollster}
            </option>
          ))}
        </select>

        <button onClick={processData} style={{ border: '2px solid green', color: 'yellow',  padding: '10px 20px', borderRadius: '5px' }}>Apply Filters</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Office Type</th>
            <th>End Date</th>
            <th>Pollster</th>
            <th>Poll Count</th>
            <th>Average Pct</th>
          </tr>
        </thead>
        <tbody>
          {groupedData.map((row, idx) => (
            <tr key={idx}>
              
              <td style={{border:"red"}}>{row.candidate_name}</td>
              <td>{row.state}</td>
              <td>{row.end_date.toDateString(undefined, options)}</td>
              <td>{row.pollster}</td>
              <td>{row.n}</td>
              <td>{row.average.toFixed(1)} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PollTable;
