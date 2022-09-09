import React, { useState } from "react";
import "../App.css";
  
const Menu = ({ 
  setLineColor, 
  setLineWidth, 
  isDrawingMode, 
  setIsDrawingMode, 
  setLineOpacity,
  isRectangMode,
  setIsRectangMode,
  downloadImage,
  pasteCutImage,
  isPasteMode,
  setIsPasteMode
}) => {

  const toggleIsDrawing = () => {
    setIsDrawingMode(!isDrawingMode)
    setIsRectangMode(false)
    setIsPasteMode(false)
  };
  const toggleIsRectang = () => {
    setIsRectangMode(!isRectangMode)
    setIsDrawingMode(false)
    setIsPasteMode(false)
  };
  const toggleIsPaste = () => {
    setIsRectangMode(false)
    setIsDrawingMode(false)
    setIsPasteMode(!isPasteMode)
  };

  console.log('drawing', isDrawingMode)
  console.log('rectang', isRectangMode)
  console.log('pasting', isPasteMode)



  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => {
          setLineOpacity(e.target.value / 100);
        }}
      />
      <button onClick={() => toggleIsDrawing()}>Start draw</button>
      <button onClick={() => toggleIsRectang()}>Cut</button>
      <button onClick={() => toggleIsPaste()}>Paste</button>

      <a onClick={downloadImage} href="/download">
        <button className="download">Save</button>
      </a>
    </div>
  );
};
  
export default Menu;