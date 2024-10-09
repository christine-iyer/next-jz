"use client"
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

const Home = () => {
  const data = [
    { lat: 43.65107, lng: -70.25030, taxDifference: 100 }, // Sample data
    { lat: 43.65200, lng: -70.25100, taxDifference: -50 },
  ];

  return (
    <div>
      <h1>Map of Tax Differences</h1>
  
      <Map class-name="newOne" data={data} /></div>
   
  );
};

export default Home;

