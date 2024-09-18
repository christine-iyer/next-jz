"use client";
import React, { useState } from "react";
import { Circle } from '@uiw/react-color';
import styles from './page.module.css';


export default function SettingsPage() {
  const [controlPoint1, setControlPoint1] = useState({ x: 44, y: 49 });
  const [controlPoint2, setControlPoint2] = useState({ x: 15, y: 70 });
  const [endPoint, setEndPoint] = useState({ x: 20, y: 100 });
  const [fillColor, setFillColor] = useState("rgb(244, 211, 179)");
  const [strokeColor, setStrokeColor] = useState("rgb(192, 227, 218)");
  const [strokeWidth, setStrokeWidth] = useState(3.5);
  const [transform, setTransform] = useState("translate(50,0)");
  const [petalList, setPetalList] = useState([]);

  const [fillColor1, setFillColor1] = useState("#FF8C9E");
  const [strokeColor1, setStrokeColor1] = useState("#DAC7DA");

  const [fillColor2, setFillColor2] = useState("#F2B88C");
  const [strokeColor2, setStrokeColor2] = useState("#B9B292");

  const [fillColor3, setFillColor3] = useState("#89C6B7");
  const [strokeColor3, setStrokeColor3] = useState("#DAC7DA");


  const colorPalettes = [
    { id: 1, hex: "#DBDDBD", rgb: "rgb(219, 221, 189)", colorName: "Honeydew" },
    { id: 2, hex: "#F4D3B3", rgb: "rgb(244, 211, 179)", colorName: "Flattering Peach" },
    { id: 3, hex: "#C0E3DA", rgb: "rgb(192, 227, 218)", colorName: "Waterfall" },
    { id: 4, hex: "#E0DDBD", rgb: "rgb(224, 221, 189)", colorName: "Celery" },
    { id: 5, hex: "#C0AFD0", rgb: "rgb(192, 175, 208)", colorName: "Magical" },
    { id: 6, hex: "#A1D4C8", rgb: "rgb(161, 212, 200)", colorName: "Refresh" },
    { id: 7, hex: "#E5DBE5", rgb: "rgb(229, 219, 229)", colorName: "Spangle" },
    { id: 8, hex: "#BBB98A", rgb: "rgb(187, 185, 138)", colorName: "Baby Bok Choy" },
    { id: 9, hex: "#F4C69F", rgb: "rgb(244, 198, 159)", colorName: "Avid Apricot" },
    { id: 10, hex: "#A8C2B7", rgb: "rgb(168, 194, 183)", colorName: "Rosewood" },
    { id: 11, hex: "#F2B88C", rgb: "rgb(242, 184, 140)", colorName: "Melón Meloso" },
    { id: 12, hex: "#CBC99D", rgb: "rgb(203, 201, 157)", colorName: "Shagreen" },
    { id: 13, hex: "#89C6B7", rgb: "rgb(137, 198, 183)", colorName: "Aquastone" },
    { id: 14, hex: "#DAC7DA", rgb: "rgb(218, 199, 218)", colorName: "Euphoric Lilac" },
    { id: 15, hex: "#D2BA83", rgb: "rgb(210, 186, 131)", colorName: "Independent Gold" },
    { id: 16, hex: "#9BA373", rgb: "rgb(155, 163, 115)", colorName: "Cucuzza Verde" },
    { id: 17, hex: "#B85444", rgb: "rgb(184, 84, 68)", colorName: "Peppery" },
    { id: 18, hex: "#C2A4C2", rgb: "rgb(194, 164, 194)", colorName: "Novel Lilac" },
    { id: 19, hex: "#BDC0A0", rgb: "rgb(189, 192, 160)", colorName: "Recycled Glass" },
    { id: 20, hex: "#FBD682", rgb: "rgb(251, 214, 130)", colorName: "Honey Bees" },
    { id: 21, hex: "#01717E", rgb: "rgb(1, 113, 126)", colorName: "Blue Nile" },
    { id: 22, hex: "#FBD073", rgb: "rgb(251, 208, 115)", colorName: "Golden Plumeria" },
    { id: 23, hex: "#CFC291", rgb: "rgb(207, 194, 145)", colorName: "Hearts of Palm" },
    { id: 24, hex: "#AD5E65", rgb: "rgb(173, 94, 101)", colorName: "Redbud" },
    { id: 25, hex: "#B9B292", rgb: "rgb(185, 178, 146)", colorName: "Koi Pond" }
  ];


  const handleInput = (e, point, setPoint) => {
    const { name, value } = e.target;
    setPoint((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleStyleInput = (e, setStyle) => {
    const { value } = e.target;
    setStyle(value);
  };

  const handleSubmit = () => {
    const newPetal = {
      controlPoint1,
      controlPoint2,
      endPoint,
      fillColor,
      strokeColor,
      strokeWidth,
      transform,
    };
    setPetalList([...petalList, newPetal]);
    console.log(petalList);
  };

  return (
    <div className="flex flex-col">
     
      <div className="flex mb-4 bg-gradient-to-r from-[#FBD073] to-[#E5DBE5] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex-none justify-between p-4 leading-normal ">
        <div className="">
          <h1 className="text-2xl font-bold mb-4">Paint Color Visualizer</h1>

          {/* SVG 1 Color Pickers */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2">Front Wall</h2>
            <div className="flex gap-6 flex-wrap">
              <div className="w-36">
                <label className="block mb-2">Fill Color:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={fillColor1}
                    colors={colorPalettes.map(palette => palette.hex)}
                    onChange={(color) => setFillColor1(color.hex)}
                  // colors={colorPalette}
                  // onChange={(color) => setFillColor1(color.hex)}
                  />
                </div>
              </div>
              <div className="w-36">
                <label className="block mb-2">Stroke Color:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={strokeColor1}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setStrokeColor1(color.hex)}
                  // colors={colorPalette}
                  // onChange={(color) => setStrokeColor1(color.hex)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SVG 2 Color Pickers */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Ceiling</h2>
            <div className="flex gap-6 flex-wrap">
              <div className="w-36">
                <label className="block mb-2">Fill Color:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={fillColor2}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setFillColor2(color.hex)}
                  />
                </div>
              </div>
              <div className="w-36">
                <label className="block mb-2">Stroke Color:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={strokeColor2}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setStrokeColor2(color.hex)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SVG 3 Color Pickers */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Right Wall</h2>
            <div className="flex gap-6 flex-wrap">
              <div className="w-36">
                <label className="block mb-2">Fill Color:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={fillColor3}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setFillColor3(color.hex)}
                  />
                </div>
              </div>
              <div className="w-36">
                <label className="block mb-2">Stroke Color:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={strokeColor3}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setStrokeColor3(color.hex)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SVG Preview */}
          <div className="flex flex-col">
            <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" >
              {/* Path 1 */}
              <path
                d="M 50 50 L 150 50 L 150 150 L 50 150 Z"
                fill={fillColor1}
                stroke={strokeColor1}
                strokeWidth={strokeWidth}
              />
              {/* Path 2 */}
              <path
                d="M 50 50 L 100 20 L 200 20 L 150 50 Z"
                fill={fillColor2}
                stroke={strokeColor2}
                strokeWidth={strokeWidth}
              />
              {/* Path 3 */}
              <path
                d="M 150 50 L 200 20 L 200 120 L 150 150 Z"
                fill={fillColor3}
                stroke={strokeColor3}
                strokeWidth={strokeWidth}
              />
            </svg>
          </div>
        </div>
      </div>


      <h1 className="text-2xl font-bold mb-4">SVG Shape Generator</h1>
      {/* Control Point 1 Inputs */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-2">Control Point 1 X:</label>
          <input
            type="number"
            name="x"
            value={controlPoint1.x}
            onChange={(e) => handleInput(e, controlPoint1, setControlPoint1)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2">Control Point 1 Y:</label>
          <input
            type="number"
            name="y"
            value={controlPoint1.y}
            onChange={(e) => handleInput(e, controlPoint1, setControlPoint1)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>
      {/* Control Point 2 Inputs */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-2">Control Point 2 X:</label>
          <input
            type="number"
            name="x"
            value={controlPoint2.x}
            onChange={(e) => handleInput(e, controlPoint2, setControlPoint2)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2">Control Point 2 Y:</label>
          <input
            type="number"
            name="y"
            value={controlPoint2.y}
            onChange={(e) => handleInput(e, controlPoint2, setControlPoint2)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>

      {/* End Point Inputs */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-2">End Point X:</label>
          <input
            type="number"
            name="x"
            value={endPoint.x}
            onChange={(e) => handleInput(e, endPoint, setEndPoint)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2">End Point Y:</label>
          <input
            type="number"
            name="y"
            value={endPoint.y}
            onChange={(e) => handleInput(e, endPoint, setEndPoint)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>

      {/* Stroke Width and Transform Inputs */}
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block mb-2">Stroke Width:</label>
          <input
            type="number"
            value={strokeWidth}
            onChange={(e) => handleStyleInput(e, setStrokeWidth)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-2">Transform:</label>
          <input
            type="text"
            value={transform}
            onChange={(e) => handleStyleInput(e, setTransform)}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>
      {/* Color Pickers */}
      <div className="flex gap-6 flex-wrap mb-6" >
        <div className="w-36">
          <label className="block mb-2">Fill Color:</label>
          <div className={styles.colorGrid}>
            <Circle
              className=""
              color={fillColor}
              colors={colorPalettes.map(p => p.hex)}
              // {['#FFDA76', '#FF8C9E', '#FF4E88', '#ffb6b1', '#ffc0cb']}
              onChange={(color) => setFillColor(color.hex)}
            />
          </div></div>
        <div className="w-36">
          <label className="block mb-2">Stroke Color:</label>
          <div className={styles.colorGrid}>
            <Circle
              color={strokeColor}
              colors={colorPalettes.map(p => p.hex)}
              // {['#66cdaa', '#008000', '#00ced1', '#b4eeb4', '#088da5']}
              onChange={(color) => setStrokeColor(color.hex)}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
      {/* SVG Preview */}
      <div className="mt-6">
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24"
        >
          <path
            d={`M0,0 C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endPoint.x},${endPoint.y}
              L0,85 L-${endPoint.x},${endPoint.y} C-${controlPoint2.x},${controlPoint2.y} -${controlPoint1.x},${controlPoint1.y} 0,0`}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={transform}
          />
        </svg>

      </div>
      {/* List of Petals */}
      <div className="flex flex-wrap gap-4 mt-6">
        {petalList.map((petal, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded-md"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-24 h-24"
            >
              <path
                d={`M0,0 C${petal.controlPoint1.x},${petal.controlPoint1.y} ${petal.controlPoint2.x},${petal.controlPoint2.y} ${petal.endPoint.x},${petal.endPoint.y}
                  L0,85 L-${petal.endPoint.x},${petal.endPoint.y} C-${petal.controlPoint2.x},${petal.controlPoint2.y} -${petal.controlPoint1.x},${petal.controlPoint1.y} 0,0`}
                fill={petal.fillColor}
                stroke={petal.strokeColor}
                strokeWidth={petal.strokeWidth}
                transform={petal.transform}
              />
            </svg>
          </div>
        ))}
      </div>
    </div>

  );
}
