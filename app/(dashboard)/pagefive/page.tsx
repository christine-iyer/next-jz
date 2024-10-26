"use client"; // Add this line at the top to make it a client component
import React, { useEffect } from "react";
import * as d3 from "d3";
import usStates from '../../data/states.json'; // Your GeoJSON data for US states

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
const stateClosingTimes = [
     {
       "State": "Alabama",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 9,
       "TimeSixteen": "8:26:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Alaska",
       "ClosingTime": "1:00:00 AM",
       "ElectoralVotes": 3,
       "TimeSixteen": "11:58:00 PM",
       "DaySixteen": "11/9/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "11:59:00 PM",
       "DayTwenty": "11/11/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Hawaii-Aleutian Time Zone"
     },
     {
       "State": "Arizona",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 11,
       "TimeSixteen": "11/9/2016",
       "DaySixteen": "3:43:00 AM",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "2:51:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Arkansas",
       "ClosingTime": "8:30:00 PM",
       "ElectoralVotes": 6,
       "TimeSixteen": "9:08:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "8:30:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "California",
       "ClosingTime": "11:00:00 PM",
       "ElectoralVotes": 54,
       "TimeSixteen": "11:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "11:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Pacific Time Zone"
     },
     {
       "State": "Colorado",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 10,
       "TimeSixteen": "10:43:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "9:37:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Connecticut",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 7,
       "TimeSixteen": "9:26:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Delaware",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 3,
       "TimeSixteen": "8:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "District of Columbia",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 3,
       "TimeSixteen": "8:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "9:27:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Florida",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 30,
       "TimeSixteen": "10:50:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "12:35:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Georgia",
       "ClosingTime": "7:00:00 PM",
       "ElectoralVotes": 16,
       "TimeSixteen": "11:33:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "11:59:00 PM",
       "DayTwenty": "11/19/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Hawaii",
       "ClosingTime": "12:00:00 AM",
       "ElectoralVotes": 4,
       "TimeSixteen": "11:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "12:06:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Hawaii-Aleutian Time Zone"
     },
     {
       "State": "Idaho",
       "ClosingTime": "11:00:00 PM",
       "ElectoralVotes": 4,
       "TimeSixteen": "11:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "11:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Pacific Time Zone"
     },
     {
       "State": "Illinois",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 19,
       "TimeSixteen": "8:58:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Indiana",
       "ClosingTime": "7:00:00 PM",
       "ElectoralVotes": 11,
       "TimeSixteen": "7:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "8:52:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Iowa",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 6,
       "TimeSixteen": "12:00:00 AM",
       "DaySixteen": "11/9/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "12:21:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Kansas",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 6,
       "TimeSixteen": "9:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "9:59:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Kentucky",
       "ClosingTime": "7:00:00 PM",
       "ElectoralVotes": 8,
       "TimeSixteen": "7:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "7:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Louisiana",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 8,
       "TimeSixteen": "9:28:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "9:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Maine *",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 4,
       "TimeSixteen": "1:56:00 AM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D3/Trump R1",
       "TimeTwenty": "3:06:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Maryland",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 10,
       "TimeSixteen": "8:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Massachusetts",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 11,
       "TimeSixteen": "8:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Michigan",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 15,
       "TimeSixteen": "2:00:00 PM",
       "DaySixteen": "11/28/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "5:58:00 PM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Minnesota",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 10,
       "TimeSixteen": "11:09:00 AM",
       "DaySixteen": "11/9/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "12:13:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Mississippi",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 6,
       "TimeSixteen": "8:11:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Missouri",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 10,
       "TimeSixteen": "10:25:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "10:31:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Montana",
       "ClosingTime": "10:00:00 PM",
       "ElectoralVotes": 4,
       "TimeSixteen": "10:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "12:20:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Nebraska",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 5,
       "TimeSixteen": "9:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "9:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Nevada",
       "ClosingTime": "10:00:00 PM",
       "ElectoralVotes": 6,
       "TimeSixteen": "12:02:00 AM",
       "DaySixteen": "11/9/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "12:13:00 PM",
       "DayTwenty": "11/7/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "New Hampshire",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 4,
       "TimeSixteen": "6:04:00 PM",
       "DaySixteen": "11/14/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "10:51:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "New Jersey",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 14,
       "TimeSixteen": "8:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "New Mexico",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 5,
       "TimeSixteen": "9:21:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "9:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "New York",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 28,
       "TimeSixteen": "9:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "9:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "North Carolina",
       "ClosingTime": "7:30:00 PM",
       "ElectoralVotes": 16,
       "TimeSixteen": "11:11:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "11:59:00 PM",
       "DayTwenty": "11/13/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "North Dakota",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 3,
       "TimeSixteen": "9:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "9:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Ohio",
       "ClosingTime": "7:30:00 PM",
       "ElectoralVotes": 17,
       "TimeSixteen": "10:36:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "12:19:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Oklahoma",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 7,
       "TimeSixteen": "8:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Oregon",
       "ClosingTime": "11:00:00 PM",
       "ElectoralVotes": 8,
       "TimeSixteen": "11:05:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "11:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Pennsylvania",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 19,
       "TimeSixteen": "1:35:00 AM",
       "DaySixteen": "11/9/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "11:25:00 AM",
       "DayTwenty": "11/7/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Rhode Island",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 4,
       "TimeSixteen": "8:39:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "South Carolina",
       "ClosingTime": "7:00:00 PM",
       "ElectoralVotes": 9,
       "TimeSixteen": "8:09:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "7:56:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "South Dakota",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 3,
       "TimeSixteen": "9:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "9:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Tennessee",
       "ClosingTime": "8:00:00 PM",
       "ElectoralVotes": 11,
       "TimeSixteen": "8:13:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "8:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Texas",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 40,
       "TimeSixteen": "9:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "1:06:00 AM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Utah",
       "ClosingTime": "10:00:00 PM",
       "ElectoralVotes": 6,
       "TimeSixteen": "11:52:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "11:08:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     },
     {
       "State": "Vermont",
       "ClosingTime": "7:00:00 PM",
       "ElectoralVotes": 3,
       "TimeSixteen": "7:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "7:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Virginia",
       "ClosingTime": "7:00:00 PM",
       "ElectoralVotes": 13,
       "TimeSixteen": "10:40:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "7:36:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Washington",
       "ClosingTime": "11:00:00 PM",
       "ElectoralVotes": 12,
       "TimeSixteen": "11:28:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Clinton D",
       "TimeTwenty": "11:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Pacific Time Zone"
     },
     {
       "State": "West Virginia",
       "ClosingTime": "7:30:00 PM",
       "ElectoralVotes": 4,
       "TimeSixteen": "7:30:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "7:30:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Eastern Time Zone"
     },
     {
       "State": "Wisconsin",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 10,
       "TimeSixteen": "2:29:00 AM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "2:16:00 PM",
       "DayTwenty": "11/4/2020",
       "WinnerTwenty": "Biden D",
       "Zone": "Central Time Zone"
     },
     {
       "State": "Wyoming",
       "ClosingTime": "9:00:00 PM",
       "ElectoralVotes": 3,
       "TimeSixteen": "9:00:00 PM",
       "DaySixteen": "11/8/2016",
       "WinnerSixteen": "Trump R",
       "TimeTwenty": "9:00:00 PM",
       "DayTwenty": "11/3/2020",
       "WinnerTwenty": "Trump R",
       "Zone": "Mountain Time Zone"
     }
   ]
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
const combinedData = stateClosingTimes.map(stateInfo => {
  const population = statePopulation[stateInfo.State];
  return { ...stateInfo, Population: population };
});

console.log(combinedData);

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

    const startTime = new Date("2020-11-03T19:00:00"); // Starting at 7 PM on 11/7/2016
    const endTime = new Date("2020-11-19T23:58:00");   
    // Create a mapping for the states from combinedData for quick lookup
    const stateDataMap = new Map(combinedData.map(d => [d.State, d]));

        // Parse each state’s `TimeSixteen` and `DaySixteen` into a Date object and sort them chronologically
        combinedData.forEach(d => {
          d.announcementTime = new Date(`${d.DayTwenty}T${d.TimeTwenty}`);
        });
    
        combinedData.sort((a, b) => a.announcementTime - b.announcementTime);  // Sort states by announcement time
    
        // Calculate total duration (in milliseconds) for the entire animation
        const totalDuration = (endTime - startTime) * 1000; 
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

        // Determine color based on WinnerSixteen and WinnerTwenty
        if (stateData) {
          const WinnerTwenty = stateData.WinnerTwenty.slice(-1);  // Get last character
    // Get last character
          return (WinnerTwenty === "R" ) ? "red" : 
          (WinnerTwenty === "D" ) ? "blue" : "white";
          // Check if either election was won by a Republican ("R") or a Democrat ("D")
          // return (winnerSixteen === "R" || winnerTwenty === "R") ? "#FF0000" : 
          //        (winnerSixteen === "D" || winnerTwenty === "D") ? "#0000FF" : "#ccc";
        }
        return "#ccc"; // Default color if no data
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
              Population: ${stateData.Population.toLocaleString()}<br>
              Electoral Votes: ${stateData.ElectoralVotes}<br>
              Winner: ${stateData.WinnerTwenty}
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");

          d3.select(this)
            .attr("stroke", "#333")
            .attr("stroke-width", 3);  
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
