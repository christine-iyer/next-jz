// components/MovieRelease.js
// import { useState } from 'react';
// import _ from 'lodash';
// import * as d3 from 'd3';
// import { VegaLite } from 'react-vega';

// const MovieRelease = () => {
//   const [releaseMonth, setReleaseMonth] = useState([]);

//   // Function to fetch and process the dataset
//   const processMovieData = async () => {
//     try {
//       const response = await fetch(
//         'https://gist.githubusercontent.com/sxywu/b94eb86c807b05080d7ee470bd1e815c/raw/8e53eb03f1ff95d53074b854e4be8b9494b3797f/110_movies.json'
//       );
//       const processedData = await response.json();

//       const releaseMonth = _.map(processedData, d => {
//         return { date: new Date(d3.timeFormat('%B %d, %Y')(new Date(d.Released))) };
//       });

//       // Update the state with the processed release dates
//       setReleaseMonth(releaseMonth);
//     } catch (error) {
//       console.error('Error fetching or processing data', error);
//     }
//   };

//   // Vega-Lite spec for the bar chart visualization
//   const vegaLiteSpec = {
//     data: { values: releaseMonth },
//     mark: 'bar',
//     encoding: {
//       x: { field: 'date', timeUnit: 'month', type: 'nominal' },
//       y: { aggregate: 'count', type: 'quantitative', field: '*' },
//     },
//   };

//   return (
//     <div>
//       <button onClick={processMovieData} style={{ border: '2px solid green', color: 'yellow',  padding: '10px 20px', borderRadius: '5px' }}>Do This Thing</button>

//       {/* Display Vega-Lite Chart */}
//       {releaseMonth.length > 0 && (
//         <div>
//           <h3>Movie Releases by Month</h3>
//           <VegaLite spec={vegaLiteSpec} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieRelease;
// components/MovieRelease.js
import { useState } from 'react';
import _ from 'lodash';
import * as d3 from 'd3';
import { VegaLite } from 'react-vega';

const MovieRelease = () => {
  const [releaseMonth, setReleaseMonth] = useState([]);

  // Function to fetch and process the dataset
  const processMovieData = async () => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/sxywu/b94eb86c807b05080d7ee470bd1e815c/raw/8e53eb03f1ff95d53074b854e4be8b9494b3797f/110_movies.json'
      );
      const processedData = await response.json();
           // Filter the data for years 2008 and 2018
           const filteredData = _.filter(processedData, (d) => {
               const releaseYear = new Date(d.Released).getFullYear();
               return releaseYear === 2008 || releaseYear === 2013;
             });

      const releaseMonth = _.map(filteredData, d => {
        // Extract date and year, and convert the date to an ISO string for serialization
        const releaseDate = new Date(d.Released);
        return {
          date: releaseDate.toISOString(), // Store as ISO string for serialization
          year: releaseDate.getFullYear(), // Extract the year for color encoding
        };
      });

      setReleaseMonth(releaseMonth);
    } catch (error) {
      console.error('Error fetching or processing data', error);
    }
  };

  // Vega-Lite spec for the bar chart visualization
  const vegaLiteSpec = {
    data: { values: releaseMonth },
    mark: 'bar',
    encoding: {
      x: { field: 'date', timeUnit: 'month', type: 'nominal', title: 'Month' }, // Group by month
      y: { aggregate: 'count', type: 'quantitative', field: '*', title: 'Number of Movies' }, // Count the movies
      color: { field: 'year', type: 'nominal', title: 'Released Year' }, // Color encoding by year
    },
  };

  return (
    <div>
      <button onClick={processMovieData}>
        Do This Thing
      </button>

      {releaseMonth.length > 0 && (
        <div>
          <h3>Movie Releases by Month</h3>
          <VegaLite spec={vegaLiteSpec} />
        </div>
      )}
    </div>
  );
};

export default MovieRelease;

