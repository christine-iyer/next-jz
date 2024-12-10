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
    <div>
    <div className="border-2 border-purple-800"> Page
      <div className="border-2 border-blue-900"> Wall Color Inputs and Display
        <div className="flex flex-row items-center border-2 border-green-700">Color Pickers
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 border-2 border-yellow-900">Front Wall</h2>
            <div className="flex gap-6 flex-wrap border-2 border-purple-100 ">
              <div className="w-36 border-2 border-bloe-100">
                <label className="block mb-2 border-2 border-red-100">Wall:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={fillColor1}
                    colors={colorPalettes.map(palette => palette.hex)}
                    onChange={(color) => setFillColor1(color.hex)}
                  />
                </div>
              </div>
              <div className="w-36">
                <label className="block mb-2">Trim:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={strokeColor1}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setStrokeColor1(color.hex)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 border-2 border-yellow-900">Ceiling</h2>
            <div className="flex gap-6 flex-wrap">
              <div className="w-36">
                <label className="block mb-2">Wall:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={fillColor2}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setFillColor2(color.hex)}
                  />
                </div>
              </div>
              <div className="w-36">
                <label className="block mb-2">Trim:</label>
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

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 border-2 border-yellow-900">Right Wall</h2>
            <div className="flex gap-6 flex-wrap">
              <div className="w-36">
                <label className="block mb-2">Wall:</label>
                <div className={styles.colorGrid}>
                  <Circle
                    color={fillColor3}
                    colors={colorPalettes.map(p => p.hex)}
                    onChange={(color) => setFillColor3(color.hex)}
                  />
                </div>
              </div>
              <div className="w-36">
                <label className="block mb-2">Trim:</label>
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
          <div className="flex flex-col border-6 border-aqua-900 justify-self-auto"> Wall Preview with Your Colors
            <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg" >
              <path
                d="M 50 50 L 150 50 L 150 150 L 50 150 Z"
                fill={fillColor1}
                stroke={strokeColor1}
                strokeWidth={strokeWidth}
              />
              <path
                d="M 50 50 L 100 20 L 200 20 L 150 50 Z"
                fill={fillColor2}
                stroke={strokeColor2}
                strokeWidth={strokeWidth}
              />
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
      <h1 className="text-2xl font-bold mb-4 border-2 border-yellow-100 ">SVG Shape Generator</h1>
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
          <label className="block mb-2">Trim:</label>
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


      <div className="flex flex-wrap gap-4 mt-6">
       
<svg height="80px" width="80px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  
	 viewBox="0 0 512 512" >
<path fill="#D7EBFF" d="M456.348,100.174c0,7.569-0.445,15.026-1.224,22.372c-1.336,12.021-3.784,23.819-7.235,35.172
	c-11.353,1.002-22.93-0.111-34.06-3.228c-5.12-1.558-10.128-3.562-15.025-6.01c-16.252-8.125-35.619-8.125-51.87,0
	c-1.557,0.779-3.115,1.558-4.674,2.226c-23.152,10.017-50.087,10.574-78.136-2.671c-2.671-1.224-5.343-2.337-8.125-3.005
	c-14.582-4.563-29.94-2.894-42.631,3.45c-12.798,6.456-26.822,9.572-40.846,9.572s-28.049-3.117-40.848-9.572
	c-11.465-5.788-24.599-7.457-36.954-4.897c-5.12,0.89-10.129,2.56-14.916,4.897c-5.343,2.671-10.908,4.786-16.473,6.344
	c-3.117-10.685-5.343-21.704-6.567-32.946c-0.667-7.123-1.113-14.358-1.113-21.704c0-32.056,7.345-62.664,21.816-91.047
	C80.362,3.562,86.15,0,92.383,0h327.235c6.233,0,12.021,3.562,14.915,9.127C449.003,37.51,456.348,68.118,456.348,100.174z"/>
<path fill="#BDDEFF" d="M456.348,100.174c0,7.569-0.445,15.026-1.224,22.372c-1.336,12.021-3.784,23.819-7.235,35.172
	c-11.353,1.002-22.93-0.111-34.06-3.228c-5.12-1.558-10.128-3.562-15.025-6.01c-16.252-8.125-35.619-8.125-51.87,0
	c-1.557,0.779-3.115,1.558-4.674,2.226c-23.152,10.017-50.087,10.574-78.136-2.671c-2.671-1.224-5.343-2.337-8.125-3.005V0h163.617
	c6.234,0,12.022,3.562,14.916,9.127C449.003,37.51,456.348,68.118,456.348,100.174z"/>
<path fill="#D7EBFF" d="M256.001,512c-9.223,0-16.696-7.473-16.696-16.696V283.826c0-9.223,7.473-16.696,16.696-16.696
	c9.223,0,16.696,7.473,16.696,16.696v211.478C272.696,504.527,265.223,512,256.001,512z"/>
<path fill="#BDDEFF" d="M272.696,495.304V283.826c0-9.223-7.473-16.696-16.696-16.696V512
	C265.223,512,272.696,504.527,272.696,495.304z"/>
<path fill="#F26D76" d="M455.124,122.546c-1.336,12.021-3.784,23.819-7.235,35.172
	c-24.71,82.588-101.398,142.803-191.889,142.803c-91.603,0-168.959-61.663-192.669-145.697c-3.117-10.685-5.343-21.704-6.567-32.946
	c11.13-3.562,15.583-8.459,32.613-11.353c19.256-3.45,39.402-0.779,57.209,8.125c27.159,13.579,47.75,1.447,58.88-3.005
	c16.696-6.678,34.172-8.125,50.532-5.12c4.674,0.89,9.239,2.115,13.69,3.673c11.13,3.896,33.614,18.81,62.332,4.452
	c25.599-12.8,56.096-12.8,81.695,0c2.561,1.224,5.121,2.337,7.792,3.117C432.418,125.44,444.105,125.663,455.124,122.546z"/>
<path fill="#E65C64" d="M455.124,122.546c-1.336,12.021-3.784,23.819-7.235,35.172
	c-24.71,82.588-101.398,142.803-191.889,142.803V110.525c4.674,0.89,9.239,2.115,13.69,3.673c11.13,3.896,33.614,18.81,62.332,4.452
	c25.599-12.8,56.096-12.8,81.695,0c2.561,1.224,5.121,2.337,7.792,3.117C432.418,125.44,444.105,125.663,455.124,122.546z"/>
<circle fill="#C4E2FF" cx="306.087" cy="217.043" r="16.696"/>
<g>
	<circle fill="#D7EBFF" cx="239.305" cy="183.652" r="16.696"/>
	<path fill="#D7EBFF" d="M339.479,512H172.522c-9.223,0-16.696-7.473-16.696-16.696s7.473-16.696,16.696-16.696h166.956
		c9.223,0,16.696,7.473,16.696,16.696S348.702,512,339.479,512z"/>
</g>
<path fill="#BDDEFF" d="M339.479,478.609h-83.478V512h83.478c9.223,0,16.696-7.473,16.696-16.696
	S348.702,478.609,339.479,478.609z"/>
</svg>
          </div>
        ))
      </div>
    </div>

  );
}
