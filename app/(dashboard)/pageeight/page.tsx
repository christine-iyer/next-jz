"use client"; // Add this line at the top to make it a client component
// import React, { useEffect } from "react";
// import * as d3 from "d3";
// import usStates from '../../data/districts.json'; // Your GeoJSON data for US states

// // Your merged data array with population and electoral votes


// const District = () => { // Renamed the component to `USMap`
//   useEffect(() => {
//     const width = 960;
//     const height = 600;

//     const svg = d3.select("#map")
//       .append("svg")
//       .attr("width", width)
//       .attr("height", height)
      


//     const projection = d3.geoAlbersUsa().scale(1000).translate([width / 2, height / 2]);
//     const path = d3.geoPath().projection(projection);

//     // Create a mapping for the states from mergedArray for quick lookup
//     // const stateDataMap = new window.Map(usStates.map(d => [d.STATE, d])); // Use `window.Map` explicitly to avoid any confusion

//     const stateDataMap = new window.Map(usStates.features.map(d => [d.properties.STATE, d]));

//     // Tooltip element
//     const tooltip = d3.select("body")
//       .append("div")
//       .attr("class", "tooltip")
//       .style("position", "absolute")
//       .style("padding", "8px")
//       .style("background", "rgba(0, 0, 0, 0.7)")
//       .style("color", "#a45b8e")
//       .style("border-radius", "4px")
//       .style("pointer-events", "none")
//       .style("opacity", 0);

//     // Draw the map
//     svg.selectAll("path")
//       .data(usStates.features)
//       .enter()
//       .append("path")
//       .attr("d", path)
      

//       .attr("fill", (d) => {
//         const stateName = d.properties.DISTRICT; // Change to the appropriate field from `properties`
//         const stateData = stateDataMap.get(stateName);
//         return stateData ? "#a45b8e" : "#ccc"; 
// })
//       .attr("stroke", "#a45b8e")
//       .attr("stroke-width", 1.5)
//       .on("mouseover", function (event, d) {
//         const stateName = d.properties.CITY;
//         const stateData = stateDataMap.get(stateName);

//         if (stateData) {
//           tooltip
//             .transition()
//             .duration(200)
//             .style("opacity", 1);
//           tooltip
//             .html(`
//               <strong>${stateName}</strong><br>
           
//             `)
//             .style("left", (event.pageX + 10) + "px")
//             .style("top", (event.pageY - 28) + "px");

//           d3.select(this)
//             .attr("stroke", "#333")
//             .attr("stroke-width", 3);  // Highlight the state boundary
//         }
//       })
//       .on("mousemove", (event) => {
//         tooltip
//           .style("left", (event.pageX + 10) + "px")
//           .style("top", (event.pageY - 28) + "px");
//       })
//       .on("mouseout", function () {
//         tooltip
//           .transition()
//           .duration(500)
//           .style("opacity", 0);

//         d3.select(this)
//           .attr("stroke", "#a45b8e")
//           .attr("stroke-width", 1.5);  // Reset the state boundary style
//       });

//   }, []);

//   return <div id="map"></div>;
// };

//  export default District; // Make sure to export the renamed component
 import React, { useEffect } from "react";
 import * as d3 from "d3";
 import usStates from '../../data/districts.json';  // Your existing state-level GeoJSON
 import usCounties from '../../data/counties.json'; // The county-level GeoJSON

 const District = () => {
   useEffect(() => {
     const width = 960;
     const height = 600;

     const svg = d3.select("#map")
       .append("svg")
       .attr("width", width)
       .attr("height", height);

     const projection = d3.geoAlbersUsa().scale(1200).translate([width / 2, height / 2]);
     const path = d3.geoPath().projection(projection);

     // Tooltip for both states and counties
     const tooltip = d3.select("body")
       .append("div")
       .attr("class", "tooltip")
       .style("position", "absolute")
       .style("padding", "8px")
       .style("background", "rgba(255, 15, 255, 0.2)")
       .style("color", "rgb(255, 165, 0)")
       .style("border-radius", "4px")
       .style("pointer-events", "none")
       .style("opacity", 0);

     // Render the state-level map first
     svg.selectAll("path.state")
       .data(usStates.features)
       .enter()
       .append("path")
       .attr("class", "state")
       .attr("d", path)
       .attr("fill", "#ccc")
       .attr("stroke", "rgb(255, 165, 0)")
       .attr("stroke-width", 1.5);

     // Render the county-level map on top
     svg.selectAll("path.county")
       .data(usCounties.features)
       .enter()
       .append("path")
       .attr("class", "county")
       .attr("d", path)
       .attr("fill", "none")
       .attr("stroke", "green")
       .attr("stroke-width", 0.5)
       .on("mouseover", function (event, d) {
         const countyName = d.properties.NAME;  // Adjust according to your GeoJSON structure

         tooltip.transition().duration(200).style("opacity", 1);
         tooltip.html(`
           <strong>County: ${countyName}</strong>
         `)
         .style("left", (event.pageX + 10) + "px")
         .style("top", (event.pageY - 28) + "px")
         .style("background", "rgba(255, 15, 255, 0.2)");

         // Highlight county boundary on hover
         d3.select(this)
           .attr("stroke", "white")
           .attr("stroke-width", 2);
       })
       .on("mousemove", (event) => {
         tooltip
           .style("left", (event.pageX + 10) + "px")
           .style("top", (event.pageY - 28) + "px");
       })
       .on("mouseout", function () {
         tooltip.transition().duration(500).style("opacity", 0);

         // Reset county boundary style after hover
         d3.select(this)
           .attr("stroke", "antiquewhite")
           .attr("stroke-width", 0.5);
       })
       .on("click", function (event, d) {
         const countyName = d.properties.NAME;
         // Perform additional actions when the county is clicked
         alert(`You clicked on: ${countyName}`);
       });

   }, []);

   return <div id="map"></div>;
 };

 export default District;
