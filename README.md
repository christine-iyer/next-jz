[rgb(219, 221, 189),
rgb(244, 211, 179),
rgb(192, 227, 218),
rgb( 224, 221, 189),
rgb( 192, 175, 208),
rgb(161, 212, 200),
rgb(229, 219, 229),
rgb(187, 185, 138),
rgb(244, 198, 159),
rgb(168 194 183) ,
rgb(242, 184, 140),
rgb( 203, 201, 157),
rgb(137, 198, 183),
rgb( 218, 199, 218),
rgb(210, 186, 131),
rgb(155, 163, 115),
rgb(184,84,68),
rgb(194, 164, 194),
rgb(189, 192,160),
rgb(251,214, 130),
rgb(1,113,126),
rgb(251,208,115),
rgb(207, 194, 145),
rgb(173,94,101),
rgb(185,178,146)]

### Sample dataset. 

poll_id,pollster,numeric_grade,pollscore,methodology,transparency_score,state,end_date,sample_size,cycle,office_type,election_date,party,candidate_name,pct
88369,ActiVote,,,App Panel,8,New York,9/25/24,400,2024,U.S. Senate,11/5/24,DEM,Kirsten E. Gillibrand,59.7
88369,ActiVote,,,App Panel,8,New York,6/2/23,400,2024,U.S. Senate,11/5/24,REP,Michael D. Sapraicone,40.3
88364,Emerson,2.9,-1.1,Online Panel/Text-to-Web,7,Texas,7/4/22,950,2024,U.S. Senate,11/5/24,DEM,Colin Allred,44.9
88364,Emerson,2.9,-1.1,Online Panel/Text-to-Web,7,Texas,2/24/21,950,2024,U.S. Senate,11/5/24,REP,Ted Cruz,48.9
88365,Emerson,2.9,-1.1,Online Panel/Text-to-Web,7,Virginia,9/24/20,860,2024,U.S. Senate,11/5/24,DEM,Timothy Michael Kaine,51.1
88365,Emerson,2.9,-1.1,Online Panel/Text-to-Web,7,Virginia,4/24/19,860,2024,U.S. Senate,11/5/24,REP,Hung Cao,41.2

### JS to format the date
```javascript
const data = [
  {
    poll_id: 88369,
    pollster: "ActiVote",
    end_date: "9/25/24",
    // other fields...
  },
  {
    poll_id: 88364,
    pollster: "Emerson",
    end_date: "7/4/22",
    // other fields...
  },
  // Add more data here...
];

// Helper function to parse date and adjust for custom week start (Tuesday)
function getWeekNumberFromDate(dateString) {
  const [month, day, year] = dateString.split("/").map(Number);
  let date = new Date(2000 + year, month - 1, day); 
  const dayOfWeek = date.getDay();
  const diff = (dayOfWeek === 0 ? -6 : 2) - dayOfWeek;
  date.setDate(date.getDate() + diff);
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - startOfYear) / 86400000; 
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
}
const updatedData = data.map((item) => {
  const weekNumber = getWeekNumberFromDate(item.end_date);
  return { ...item, week_number: weekNumber };
});
console.log(updatedData);
```
