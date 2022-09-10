import React, { useState } from "react";
import "../App.css";
  
const Menu = ({ 
  setLineColor, 
  setLineWidth,
  lineWidth,
  isDrawingMode, 
  setIsDrawingMode, 
  setLineOpacity,
  isRectangMode,
  setIsRectangMode,
  downloadImage,
  pasteCutImage,
  isPasteMode,
  setIsPasteMode,
  setIsCropMode,
  isCropMode,
  cleanCanvas,
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
  const toggleIsCrop = () => {
    setIsRectangMode(true)
    setIsCropMode(true)
    setIsDrawingMode(false)
    setIsPasteMode(false)
  };

  console.log('drawing', isDrawingMode)
  console.log('rectang', isRectangMode)
  console.log('pasting', isPasteMode)
  console.log('cropping', isCropMode)



  return (
    <div className="menu">
      <div className="menu__button">
        {/* <button className="menu__button" onClick={() => toggleIsDrawing()}>Start draw</button> */}
        <button className="menu__button-crop" onClick={() => toggleIsCrop()}>Crop</button>
        <button className="menu__button-cut" onClick={() => toggleIsRectang()}>Copy</button>
        <button className="menu__button-paste" onClick={() => toggleIsPaste()}>Paste</button>
        <button className="menu__button-clean" onClick={() => cleanCanvas()}>Clean</button>

        <a className="menu__button-save" onClick={downloadImage} href="/download">
          <button className="download">Save</button>
        </a>
      </div>

      <div className="menu-choose">
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
          value={lineWidth}
          min="1"
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
          value={100}
          onChange={(e) => {
            setLineOpacity(e.target.value / 100);
          }}
        />
      </div>
    </div>
  );
};
  
export default Menu;