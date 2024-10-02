"use client"; // Add this line at the top to make it a client component
import React, { useEffect } from "react";
import * as d3 from "d3";
import usStates from '../../data/states.json'; // Your GeoJSON data for US states

// Your merged data array with population and electoral votes
// const mergedArray = Object.keys(stateElectorate).map(state => ({
//   stateName: state,
//   electoralVotes: stateElectorate[state],
//   population: statePopulation[state] || 'Unknown'
// }));
const statePopulation = {
  'Alabama': 4903185,
  'Alaska': 731545,
  'Arizona': 7278717,
  'Arkansas': 3017804,
  'California': 39512223,
  'Colorado': 5758736,
  'Connecticut': 3565287,
  'Delaware': 973764,
  'District of Columbia': 705749,
  'Florida': 21477737,
  'Georgia': 10617423,
  'Hawaii': 1415872,
  'Idaho': 1787065,
  'Illinois': 12671821,
  'Indiana': 6732219,
  'Iowa': 3155070,
  'Kansas': 2913314,
  'Kentucky': 4467673,
  'Louisiana': 4648794,
  'Maine': 1344212,
  'Maryland': 6045680,
  'Massachusetts': 6892503,
  'Michigan': 9986857,
  'Minnesota': 5639632,
  'Mississippi': 2976149,
  'Missouri': 6137428,
  'Montana': 1068778,
  'Nebraska': 1934408,
  'Nevada': 3080156,
  'New Hampshire': 1359711,
  'New Jersey': 8882190,
  'New Mexico': 2096829,
  'New York': 19453561,
  'North Carolina': 10488084,
  'North Dakota': 762062,
  'Ohio': 11689100,
  'Oklahoma': 3956971,
  'Oregon': 4217737,
  'Pennsylvania': 12801989,
  'Rhode Island': 1059361,
  'South Carolina': 5148714,
  'South Dakota': 884659,
  'Tennessee': 6829174,
  'Texas': 28995881,
  'Utah': 3205958,
  'Vermont': 623989,
  'Virginia': 8535519,
  'Washington': 7614893,
  'West Virginia': 1792147,
  'Wisconsin': 5822434,
  'Wyoming': 578759

};

const stateElectorate = {
  'Alabama': 9,
  'Alaska': 3,
  'Arizona': 11,
  'Arkansas': 6,
  'California': 54,
  'Colorado': 10,
  'Connecticut': 7,
  'Delaware': 3,
  'District of Columbia': 3,
  'Florida': 30,
  'Georgia': 16,
  'Hawaii': 4,
  'Idaho': 4,
  'Illinois': 19,
  'Indiana': 11,
  'Iowa': 6,
  'Kansas': 6,
  'Kentucky': 8,
  'Louisiana': 8,
  'Maine': 4,
  'Maryland': 10,
  'Massachusetts': 11,
  'Michigan': 15,
  'Minnesota': 10,
  'Mississippi': 6,
  'Missouri': 10,
  'Montana': 4,
  'Nebraska': 5,
  'Nevada': 6,
  'New Hampshire': 4,
  'New Jersey': 14,
  'New Mexico': 5,
  'New York': 28,
  'North Carolina': 16,
  'North Dakota': 3,
  'Ohio': 17,
  'Oklahoma': 7,
  'Oregon': 8,
  'Pennsylvania': 19,
  'Rhode Island': 4,
  'South Carolina': 9,
  'South Dakota': 3,
  'Tennessee': 11,
  'Texas': 40,
  'Utah': 6,
  'Vermont': 3,
  'Virginia': 13,
  'Washington': 12,
  'West Virginia': 4,
  'Wisconsin': 10,
  'Wyoming': 3
}
const mergedArray = Object.keys(stateElectorate).map(state => ({
  stateName: state,
  electoralVotes: stateElectorate[state],
  population: statePopulation[state] || 'Unknown',
  ratioOne: statePopulation[state] * (stateElectorate[state]-2),
  ratioTwo: (stateElectorate[state]-2) / statePopulation[state] * 100000
}));

const USMap = () => {
  useEffect(() => {
    const width = 960;
    const height = 600;

    const svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3.geoAlbersUsa().scale(1000).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);

    // Create a mapping for the states from mergedArray for quick lookup
    const stateDataMap = new Map(mergedArray.map(d => [d.stateName, d]));

    // Color scale for population (or electoral votes)
    const populationValues = mergedArray.map(d => d.population).filter(d => d !== 'Unknown');
    const colorScale = d3.scaleLinear()
      .domain([d3.min(populationValues), d3.max(populationValues)])
      .range(["#d0e562", "#93c48b"]);

    // Tooltip element
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "rgba(0, 0, 0, 0.7)")
      .style("color", "#a45b8e")
      .style("border-radius", "4px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Draw the map
    svg.selectAll("path")
      .data(usStates.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => {
        const stateName = d.properties.NAME;
        const stateData = stateDataMap.get(stateName);

        // Use population for color scaling if available, else default color
        return stateData ? colorScale(stateData.population) : "#ccc";
      })
      .attr("stroke", "#a45b8e")
      .attr("stroke-width", 1.5)
      .on("mouseover", function (event, d) {
        const stateName = d.properties.NAME;
        const stateData = stateDataMap.get(stateName);

        if (stateData) {
          tooltip
            .transition()
            .duration(200)
            .style("opacity", 1);
          tooltip
            .html(`
              <strong>${stateName}</strong><br>
              Population: ${stateData.population.toLocaleString()}<br>
              Electoral Votes: ${stateData.electoralVotes}<br>
              ratioOne: ${stateData.ratioOne.toFixed(2)}<br>
              ratioTwo: ${stateData.ratioTwo.toFixed(6)}
              
`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");

          d3.select(this)
            .attr("stroke", "#333")
            .attr("stroke-width", 3);  // Highlight the state boundary
        }
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        tooltip
          .transition()
          .duration(500)
          .style("opacity", 0);

        d3.select(this)
          .attr("stroke", "#a45b8e")
          .attr("stroke-width", 1.5);  // Reset the state boundary style
      });

  }, []);

  return <div id="map"></div>;
};

export default USMap;
