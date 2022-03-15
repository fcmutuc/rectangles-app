import React, { useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Instructions from '../Instructions/Instructions.js';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

export default function App() {
  const { editor, onReady } = useFabricJSEditor();

  const [rectangleCount, setRectangleCount] = useState(0);

  const onAddRectangle = () => {
    if (rectangleCount === 2) {
      alert('Only 2 Rectangles are currently allowed.');
      return false;
    }
    if (rectangleCount >= 0 || rectangleCount < 2) {
      setRectangleCount(rectangleCount + 1);
      editor.addRectangle();
    }
  };

  const onClearCanvas = () => {
    editor.deleteAll();
    setRectangleCount(0);
  };

  return (
    <div className="App">
      <h1>Rectangles App</h1>
      <Instructions />
      <Stack direction="row" spacing={1}>
        <IconButton name="add-rectangle" aria-label="add a rectangle" onClick={onAddRectangle}>
          <CropLandscapeIcon />
        </IconButton>
        <IconButton name="clear-canvas" aria-label="clear the canvas" onClick={onClearCanvas}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
    </div>
  );
}
