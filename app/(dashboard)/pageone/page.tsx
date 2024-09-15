"use client";
import React, { useState } from "react";
import { Compact, Circle } from '@uiw/react-color';

export default function SettingsPage() {
  const [controlPoint1, setControlPoint1] = useState({ x: 44, y: 49 });
  const [controlPoint2, setControlPoint2] = useState({ x: 15, y: 70 });
  const [endPoint, setEndPoint] = useState({ x: 20, y: 100 });
  const [fillColor, setFillColor] = useState("#FBA834");
  const [strokeColor, setStrokeColor] = useState("#5F5D9C");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [transform, setTransform] = useState("translate(50,0)");
  const [petalList, setPetalList] = useState([]);

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
            colors={['#FFDA76', '#FF8C9E', '#FF4E88', '#ffb6b1', '#ffc0cb']}
            onChange={(color) => setFillColor(color.hex)}
          />
        </div>
        <div className="w-36">
          <label className="block mb-2">Stroke Color:</label>
          <Circle
            color={strokeColor}
            colors={['#66cdaa', '#008000', '#00ced1', '#b4eeb4', '#088da5']}
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
