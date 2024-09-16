"use client";
import React, { useState } from "react";
import { Compact, Circle } from '@uiw/react-color';

export default function SettingsPage() {
  const [controlPoint1, setControlPoint1] = useState({ x: 44, y: 49 });
  const [controlPoint2, setControlPoint2] = useState({ x: 15, y: 70 });
  const [endPoint, setEndPoint] = useState({ x: 20, y: 100 });
  const [fillColor, setFillColor] = useState("rgb(244, 211, 179)");
  const [strokeColor, setStrokeColor] = useState("rgb(192, 227, 218)");
  const [strokeWidth, setStrokeWidth] = useState(3.5);
  const [transform, setTransform] = useState("translate(50,0)");
  const [petalList, setPetalList] = useState([]);
  const colorPalette = [
    "#DBDDBD", // rgb(219, 221, 189)
    "#F4D3B3", // rgb(244, 211, 179)
    "#C0E3DA", // rgb(192, 227, 218)
    "#E0DDBD", // rgb(224, 221, 189)
    "#C0AFD0", // rgb(192, 175, 208)
    "#A1D4C8", // rgb(161, 212, 200)
    "#E5DBE5", // rgb(229, 219, 229)
    "#BBB98A", // rgb(187, 185, 138)
    "#F4C69F", // rgb(244, 198, 159)
    "#A8C2B7", // rgb(168, 194, 183) (missing commas fixed)
    "#F2B88C", // rgb(242, 184, 140)
    "#CBC99D", // rgb(203, 201, 157)
    "#89C6B7", // rgb(137, 198, 183)
    "#DAC7DA", // rgb(218, 199, 218)
    "#D2BA83", // rgb(210, 186, 131)
    "#9BA373", // rgb(155, 163, 115)
    "#B85444", // rgb(184, 84, 68)
    "#C2A4C2", // rgb(194, 164, 194)
    "#BDC0A0", // rgb(189, 192, 160)
    "#FBD682", // rgb(251, 214, 130)
    "#01717E", // rgb(1, 113, 126)
    "#FBD073", // rgb(251, 208, 115)
    "#CFC291", // rgb(207, 194, 145)
    "#AD5E65", // rgb(173, 94, 101)
    "#B9B292"  // rgb(185, 178, 146)
  ];
  
  // const colorPalette = ["rgb(219, 221, 189)",
  //   "rgb(244, 211, 179)",
  //   "rgb(192, 227, 218)",
  //   "rgb( 224, 221, 189)",
  //   "rgb( 192, 175, 208)",
  //   "rgb(161, 212, 200)",
  //   "rgb(229, 219, 229)",
  //   "rgb(187, 185, 138)",
  //   "rgb(244, 198, 159)",
  //   "rgb(168 194 183)" ,
  //   "rgb(242, 184, 140)",
  //   "rgb( 203, 201, 157)",
  //   "rgb(137, 198, 183)",
  //   "rgb( 218, 199, 218)",
  //   "rgb(210, 186, 131)",
  //   "rgb(155, 163, 115)",
  //   "rgb(184,84,68)",
  //   "rgb(194, 164, 194)",
  //   "rgb(189, 192,160)",
  //   "rgb(251,214, 130)",
  //   "rgb(1,113,126)",
  //   "rgb(251,208,115)",
  //   "rgb(207, 194, 145)",
  //   "rgb(173,94,101)",
  //   "rgb(185,178,146)"]

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
  };

  return (
    <div className="p-6">
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
      <div className="flex gap-6 flex-wrap mb-6">
        <div className="w-36">
          <label className="block mb-2">Fill Color:</label>
          <Circle
            color={fillColor}
            colors= {colorPalette}
            // {['#FFDA76', '#FF8C9E', '#FF4E88', '#ffb6b1', '#ffc0cb']}
            onChange={(color) => setFillColor(color.hex)}
          />
        </div>
        <div className="w-36">
          <label className="block mb-2">Stroke Color:</label>
          <Circle
            color={strokeColor}
            colors= {colorPalette}
            // {['#66cdaa', '#008000', '#00ced1', '#b4eeb4', '#088da5']}
            onChange={(color) => setStrokeColor(color.hex)}
          />
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
