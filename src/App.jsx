import { useEffect, useRef, useState } from "react";
import Menu from "./component/Menu";
import "./App.css";

function App() {
  const canvasHeight = 400;
  const canvasWidth = 600;

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(3);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(100);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  const [isRectangMode, setIsRectangMode] = useState(false);
  const [isRectang, setIsRectang] = useState(false);

  const [isPasteMode, setIsPasteMode] = useState(false);
  const [isCropMode, setIsCropMode] = useState(false);

  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState();
  const [endX, setEndX] = useState();
  const [endY, setEndY] = useState();

  const [imageData, setImageData] = useState();
  const [saved, setSaved] = useState();
  const [savedTemp, setSavedTemp] = useState();

  const [imageHistoryUndo, setImageHistoryUndo] = useState([]);
  const [imageHistoryRedo, setImageHistoryRedo] = useState([]);
  const [startSave, setStartSave] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctx.globalAlpha = lineOpacity;
    ctxRef.current = ctx;
  }, [lineColor, lineWidth, lineOpacity]);

  useEffect(() => {
    const image = ctxRef.current.getImageData(0, 0, canvasWidth, canvasHeight);
    if (image && startSave) {
      setImageHistoryUndo([image, ...imageHistoryUndo]);
    }
  }, [startSave]);

  useEffect(() => {
    if (isRectangMode && startX !== endX) {
      setImageData(
        ctxRef.current.getImageData(
          startX + 1,
          startY + 1,
          endX - startX - 2,
          endY - startY - 2
        )
      );
    }
  }, [endX]);

  useEffect(() => {
    if (isCropMode) {
      setStartSave(true);
      ctxRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      ctxRef.current.putImageData(
        imageData,
        canvasWidth / 2 - imageData.width / 2,
        canvasHeight / 2 - imageData.height / 2
      );
      setIsCropMode(false);
      setIsDrawingMode(true);
      setIsRectangMode(false);
    }
  }, [imageData]);

  const onMouseDowning = () => {
    if (isDrawingMode) {
      return startDrawing;
    }
    if (isRectangMode) {
      return startRectang;
    }
    if (isPasteMode) {
      return endPaste;
    }
  };

  const onMouseUpping = () => {
    if (isDrawingMode) {
      return endDrawing;
    }
    if (isRectangMode) {
      return endRectang;
    }
  };

  const onMouseMoving = () => {
    if (isDrawingMode) {
      return draw;
    }
    if (isRectangMode) {
      return drawRectang;
    }
    if (isPasteMode && imageData) {
      return drawPaste;
    }
  };

  const startDrawing = (e) => {
    setStartSave(false);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    setStartSave(true);
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const startRectang = (e) => {
    setStartSave(false);
    setIsRectang(true);
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
    setSavedTemp(ctxRef.current.getImageData(0, 0, canvasWidth, canvasHeight));
    setSaved(canvasRef.current.toDataURL());
  };

  const endRectang = (e) => {
    ctxRef.current.putImageData(savedTemp, 0, 0);
    setEndX(e.nativeEvent.offsetX);
    setEndY(e.nativeEvent.offsetY);
    setIsRectang(false);
  };

  const drawRectang = (e) => {
    if (!isRectang) {
      return;
    }
    const img = new Image();
    img.src = saved;
    img.onload = () => {
      ctxRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      ctxRef.current.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      ctxRef.current.beginPath();
      if (!isDrawing) {
        ctxRef.current.lineWidth = 1;
        ctxRef.current.strokeStyle = "black";
        ctxRef.current.setLineDash([10, 20]);
      }
      ctxRef.current.rect(
        startX,
        startY,
        e.nativeEvent.offsetX - startX,
        e.nativeEvent.offsetY - startY
      );
      ctxRef.current.stroke();
      ctxRef.current.setLineDash([]);
      ctxRef.current.strokeStyle = lineColor;
      ctxRef.current.lineWidth = lineWidth;
    };
  };

  const drawPaste = (e) => {
    const img = new Image();
    img.src = saved;
    ctxRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxRef.current.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    ctxRef.current.putImageData(
      imageData,
      e.nativeEvent.offsetX - imageData.width / 2,
      e.nativeEvent.offsetY - imageData.height / 2
    );
  };

  const endPaste = (e) => {
    setStartSave(true);
    setIsPasteMode(false);
    setIsDrawingMode(true);
  };

  const cleanCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  const downloadImage = (e) => {
    const link = e.currentTarget;
    link.setAttribute("download", "picture.png");
    const picture = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", picture);
  };

  const undoHistory = () => {
    if (imageHistoryUndo.length) {
      setImageHistoryRedo([imageHistoryUndo[0], ...imageHistoryRedo]);
      imageHistoryUndo[1]
        ? ctxRef.current.putImageData(imageHistoryUndo[1], 0, 0)
        : ctxRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      setImageHistoryUndo(imageHistoryUndo.slice(1));
    }
  };

  const redoHistory = () => {
    if (imageHistoryRedo.length) {
      setImageHistoryUndo([imageHistoryRedo[0], ...imageHistoryUndo]);
      ctxRef.current.putImageData(imageHistoryRedo[0], 0, 0);
      setImageHistoryRedo(imageHistoryRedo.slice(1));
    }
  };

  return (
    <div className="App">
      <h1>Paint Canvas App</h1>
      <Menu
        setLineColor={setLineColor}
        lineWidth={lineWidth}
        setLineWidth={setLineWidth}
        setIsDrawingMode={setIsDrawingMode}
        lineOpacity={lineOpacity}
        setLineOpacity={setLineOpacity}
        isRectangMode={isRectangMode}
        setIsRectangMode={setIsRectangMode}
        isPasteMode={isPasteMode}
        setIsPasteMode={setIsPasteMode}
        setIsCropMode={setIsCropMode}
        cleanCanvas={cleanCanvas}
        downloadImage={downloadImage}
        undoHistory={undoHistory}
        redoHistory={redoHistory}
        imageHistoryRedo={imageHistoryRedo}
        imageHistoryUndo={imageHistoryUndo}
      />
      <div className="draw-area">
        <div className="canvas__area">
          <canvas
            onMouseDown={onMouseDowning()}
            onMouseUp={onMouseUpping()}
            onMouseMove={onMouseMoving()}
            ref={canvasRef}
            width={`${canvasWidth}px`}
            height={`${canvasHeight}px`}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
