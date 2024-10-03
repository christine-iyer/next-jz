"use client";
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Papa from 'papaparse';

const TimeSeriesChart = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [cycle, setCycle] = useState('All');
  const [party, setParty] = useState('All');
  const [candidate, setCandidate] = useState('All');

  const svgRef = useRef();

  useEffect(() => {
    // Fetch and parse CSV file
    fetch('./senateHistorical.csv')
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data
              .map((d) => ({
                ...d,
                pct: parseFloat(d.pct) || 0, // Ensure pct is treated as a number
                end_date: new Date(d.end_date),
              }))
              .filter((d) => ['DEM', 'REP', 'IND'].includes(d.party)); // Static filter for DEM, REP, IND
            setData(parsedData);
            setFilteredData(parsedData); // Initially, set filteredData to all data
          },
        });
      });
  }, []);

  useEffect(() => {
    // Draw the chart whenever data changes
    drawChart(filteredData);
  }, [filteredData]);

  // Function to update the filtered data based on user input
  const handleFilterChange = () => {
    let updatedData = data;

    // Filter by cycle
    if (cycle !== 'All') {
      updatedData = updatedData.filter((d) => d.cycle === cycle);
    }

    // Filter by party
    if (party !== 'All') {
      updatedData = updatedData.filter((d) => d.party === party);
    }

    // Filter by candidate
    if (candidate !== 'All') {
      updatedData = updatedData.filter((d) => d.candidate_name === candidate);
    }

    setFilteredData(updatedData);
  };

  const drawChart = (data) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous chart

    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Parse the date and filter to months (from January to December)
    const months = [...Array(12).keys()].map((d) => new Date(0, d));

    // Create the x scale (months)
    const x = d3
      .scaleTime()
      .domain([new Date(0, 0), new Date(0, 11)])
      .range([0, width]);

    // Create the y scale (pct)
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.pct) || 100])
      .range([height, 0]);

    // Line generator function
    const line = d3
      .line()
      .x((d) => x(new Date(0, d.end_date.getMonth())))
      .y((d) => y(d.pct));

    // Tooltip for candidate and election details
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#f9f9f9')
      .style('padding', '10px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '5px');

    // Append SVG and g element
    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat(d3.timeFormat('%B')) // Format the months
          .ticks(12)
      )
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');

    // Y Axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y));

    // Plot the line
    svg
      .append('path')
      .datum(data)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    // Plot circles for each data point
    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(new Date(0, d.end_date.getMonth())) + margin.left)
      .attr('cy', (d) => y(d.pct) + margin.top)
      .attr('r', 5)
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        tooltip
          .html(
            `<strong>Candidate:</strong> ${d.candidate_name}<br><strong>Party:</strong> ${d.party}<br><strong>Cycle:</strong> ${d.cycle}<br><strong>Pct:</strong> ${d.pct}<br><strong>Date:</strong> ${d3.timeFormat(
              '%B %d, %Y'
            )(d.end_date)}`
          )
          .style('visibility', 'visible');
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', event.pageY - 50 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
  };

  return (
    <div>
      <h2>Time Series Chart with Filters</h2>

      {/* Filters */}
      <div>
        <label>Cycle: </label>
        <select value={cycle} onChange={(e) => setCycle(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(data.map((d) => d.cycle))].map((cycle, idx) => (
            <option key={idx} value={cycle}>
              {cycle}
            </option>
          ))}
        </select>

        <label> Party: </label>
        <select value={party} onChange={(e) => setParty(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(data.map((d) => d.party))].map((party, idx) => (
            <option key={idx} value={party}>
              {party}
            </option>
          ))}
        </select>

        <label> Candidate: </label>
        <select value={candidate} onChange={(e) => setCandidate(e.target.value)}>
          <option value="All">All</option>
          {[...new Set(data.map((d) => d.candidate_name))].map((candidate, idx) => (
            <option key={idx} value={candidate}>
              {candidate}
            </option>
          ))}
        </select>

        <button onClick={handleFilterChange} style={{ border: '2px solid green', color: 'yellow',  padding: '10px 20px', borderRadius: '5px' }} >Apply Filters</button>
      </div>

      {/* Chart */}
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TimeSeriesChart;
