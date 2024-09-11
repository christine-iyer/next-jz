"use client"; 
import React, { useState } from "react";
import { Compact, Circle } from '@uiw/react-color';
import styles from "../../page.module.css"
export default function SettingsPage() {const [controlPoint1, setControlPoint1] = useState({ x: 44, y: 49 });
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
  <div>
    <h1>SVG Shape Generator</h1>

    <div>
      <label>Control Point 1 X:
        <input type="number" name="x" value={controlPoint1.x} onChange={(e) => handleInput(e, controlPoint1, setControlPoint1)} />
      </label>
      <label>Control Point 1 Y:
        <input type="number" name="y" value={controlPoint1.y} onChange={(e) => handleInput(e, controlPoint1, setControlPoint1)} />
      </label>
    </div>

    <div>
      <label>Control Point 2 X:
        <input type="number" name="x" value={controlPoint2.x} onChange={(e) => handleInput(e, controlPoint2, setControlPoint2)} />
      </label>
      <label>Control Point 2 Y:
        <input type="number" name="y" value={controlPoint2.y} onChange={(e) => handleInput(e, controlPoint2, setControlPoint2)} />
      </label>
    </div>

    <div>
      <label>End Point X:
        <input type="number" name="x" value={endPoint.x} onChange={(e) => handleInput(e, endPoint, setEndPoint)} />
      </label>
      <label>End Point Y:
        <input type="number" name="y" value={endPoint.y} onChange={(e) => handleInput(e, endPoint, setEndPoint)} />
      </label>
    </div>

    <div>
      <label>Stroke Width:
        <input type="number" value={strokeWidth} onChange={(e) => handleStyleInput(e, setStrokeWidth)} />
      </label>
      <label>Transform:
        <input type="text" value={transform} onChange={(e) => handleStyleInput(e, setTransform)} />
      </label>
    </div>

    {/* Container for the color pickers */}
    <div style={{ display: "flex", gap: "20px", margin: "20px 0", flexWrap: "wrap" }}>
      <div style={{ width: "150px", overflow: "visible" }}>
        <label>Fill Color:</label>
        <Circle
          style={{ marginTop: "10px", width: "100%" }}  // Ensure color picker fits in the container
          color={fillColor}
          colors={[
             '#FFDA76', '#FF8C9E', '#FF4E88', '#ffb6b1',
            '#ffc0cb', '#ffd700', '#C65BCF', '#ff7373', '#ffeb3b','#eea83b', 
            '#E1AFD1','#F27BBD', '#FF9040', '#CC0000'
          ]}
          onChange={(color) => { setFillColor(color.hex); }}
          className="compact-picker"
        />
      </div>
      
      <div style={{ width: "150px", overflow: "visible" }}>
        <label>Border Color:</label>
        <Circle
          style={{ marginTop: "10px", width: "100%" }}  // Ensure color picker fits in the container
          color={strokeColor}
          colors={[
            '#66cdaa', '#008000', '#00ced1', '#b4eeb4', '#088da5', 
            '#81d8d0', '#a0db8e', '#80B9AD','#EEDF7A','#7469B6',
            '#E9FF97','#B4D6CD','#6b7f64', '#339551'
          ]}
          onChange={(color) => { setStrokeColor(color.hex); }}
          className="compact-picker"
        />
      </div>
    </div>

    <button style={{ marginTop: "20px" }} onClick={handleSubmit}>Submit</button>

    {/* Preview SVG */}
    <div style={{ marginTop: "20px" }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", maxWidth: "100px", maxHeight: "100px", overflow: "visible", margin: "5px" }}>
        <path
          d={`
            M0,0 
            C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endPoint.x},${endPoint.y}
            L0,85 
            L-${endPoint.x},${endPoint.y} 
            C-${controlPoint2.x},${controlPoint2.y} -${controlPoint1.x},${controlPoint1.y} 0,0
          `}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          transform={transform}
        />
      </svg>
    </div>

    {/* List of petals */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
      {petalList.map((petal, index) => (
        <div key={index} style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", maxWidth: "100px", maxHeight: "100px", overflow: "visible" }}>
            <path
              d={`
                M0,0 
                C${petal.controlPoint1.x},${petal.controlPoint1.y} ${petal.controlPoint2.x},${petal.controlPoint2.y} ${petal.endPoint.x},${petal.endPoint.y}
                L0,85 
                L-${petal.endPoint.x},${petal.endPoint.y} 
                C-${petal.controlPoint2.x},${petal.controlPoint2.y} -${petal.controlPoint1.x},${petal.controlPoint1.y} 0,0
              `}
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
   