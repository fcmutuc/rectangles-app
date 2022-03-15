import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Instructions from '../Instructions/Instructions.js';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

export default function App() {
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [rectangleCount, setRectangleCount] = useState(0);
  //const [objectIsHighlighted, setObjectIsHighlighted] = useState(false);

  const onAddRectangle = () => {
    if (rectangleCount === 2) {
      alert('Only 2 Rectangles are currently allowed.');
      return false;
    }
    if (rectangleCount >= 0 || rectangleCount < 2) {
      setRectangleCount(rectangleCount + 1);
      editor.addRectangle();
      console.log('after add');
      console.log('editor ->');
      console.log(editor);
      let allObjects = editor.canvas.getObjects();
      if (allObjects.length) {
        let selectedObject = allObjects[editor.canvas.size() - 1];
        editor.canvas.setActiveObject(selectedObject);
      }
    }
  };

  const onClearCanvas = () => {
    editor.deleteAll();
    setRectangleCount(0);
  };

  useEffect(() => {
    console.log('in useEffect');
    if (selectedObjects !== undefined) {
      console.log('selectedObjects ->');
      console.log(selectedObjects);
    }
    if (editor?.canvas !== undefined) {
      console.log('editor.canvas.getActiveObjects() ->');
      console.log(editor.canvas.getActiveObjects());
    }
  }, [rectangleCount, editor?.canvas, selectedObjects])

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
