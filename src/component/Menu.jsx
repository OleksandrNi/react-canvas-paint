import React from "react";
import "../App.css";
  
const Menu = ({ 
  setLineColor, 
  lineWidth,
  setLineWidth,
  setIsDrawingMode, 
  lineOpacity,
  setLineOpacity,
  isRectangMode,
  setIsRectangMode,
  isPasteMode,
  setIsPasteMode,
  setIsCropMode,
  downloadImage,
  cleanCanvas,
  undoHistory,
  redoHistory,
  imageHistoryRedo,
  imageHistoryUndo
}) => {

  const toggleIsRectang = () => {
    setIsRectangMode(!isRectangMode);
    setIsDrawingMode(false);
    setIsPasteMode(false);
  };

  const toggleIsPaste = () => {
    setIsRectangMode(false);
    setIsDrawingMode(false);
    setIsPasteMode(!isPasteMode);
  };

  const toggleIsCrop = () => {
    setIsRectangMode(true);
    setIsCropMode(true);
    setIsDrawingMode(false);
    setIsPasteMode(false);
  };

  return (
    <div className="menu">
      <div className="menu__button">
        <div>
          <button className="button menu__button-crop" onClick={() => toggleIsCrop()} disabled={isRectangMode}></button>
          <button className="button menu__button-copy" onClick={() => toggleIsRectang()} disabled={isRectangMode}></button>
          <button className="button menu__button-paste" onClick={() => toggleIsPaste()} disabled={isPasteMode}></button>
          <button className="button menu__button-clean" onClick={() => cleanCanvas()}></button>
        </div>
        <div>
          <button className="button menu__button-undo" onClick={() => undoHistory()} disabled={!imageHistoryUndo.length}></button>
          <button className="button menu__button-redo" onClick={() => redoHistory()} disabled={!imageHistoryRedo.length}></button>
          <a onClick={downloadImage} href="/download">
            <button className="button menu__button-save"></button>
          </a>
        </div>
      </div>

      <div className="menu__choose">
        <label className="menu__choose-label"></label>
        <input
         className="menu__choose-color"
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
          value={lineOpacity * 100}
          onChange={(e) => {
            setLineOpacity(e.target.value / 100);
          }}
        />
      </div>
    </div>
  );
};
  
export default Menu;