import React, { useEffect, useState } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Instructions from '../Instructions/Instructions.js';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import DeleteIcon from '@mui/icons-material/Delete';
import './App.css';

export default function App() {
  const { editor, onReady } = useFabricJSEditor();
  const [rectangleCount, setRectangleCount] = useState(0);
  const [countIsValid, setCountIsValid] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isContained, setIsContained] = useState(false);
  const [isAdjacent, setIsAdjacent] = useState(false);

  const onAddRectangle = () => {
    if (rectangleCount === 2) {
      alert('Only two rectangles are currently allowed.');
      return false;
    }
    if (rectangleCount >= 0 || rectangleCount < 2) {
      setCountIsValid(((rectangleCount + 1) === 2) ? true : false);
      setRectangleCount(rectangleCount + 1);
      editor.addRectangle();
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
    setCountIsValid(0);
    setIsIntersecting(false);
    setIsContained(false);
    setIsAdjacent(false);
  };

  useEffect(() => {

    const determineOutput = (options) => {
      options.target.setCoords();
      editor.canvas.forEachObject(function(obj) {
        if (obj === options.target) {
            return;
        }
        let otherObjectCoords = obj.getCoords();
        if (otherObjectCoords.length === 4 && 
          (
          options.target.containsPoint(otherObjectCoords[0]) || 
          options.target.containsPoint(otherObjectCoords[1]) || 
          options.target.containsPoint(otherObjectCoords[2]) || 
          options.target.containsPoint(otherObjectCoords[3])
          )
          ) {
            setIsAdjacent(true);
        } else {
          setIsAdjacent(false);
        }
        setIsContained(options.target.isContainedWithinObject(obj));
        setIsIntersecting(options.target.intersectsWithObject(obj));
      });
    };

    if (editor?.canvas !== undefined) {
      editor.canvas.on({
        'selection:updated': determineOutput,
        'object:added': determineOutput,
        'object:modified': determineOutput,
        'object:moving': determineOutput,
        'object:scaling': determineOutput,
        'object:rotating': determineOutput
      });
    }
  }, [editor?.canvas])

  return (
    <div className="App">
      <h1>Rectangles App</h1>
      <Instructions />
      <Stack direction="row" spacing={1}>
      <Tooltip title="Add a Rectangle">
        <IconButton name="add-rectangle" aria-label="add a rectangle" onClick={onAddRectangle}>
          <CropLandscapeIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="Clear the Canvas">
        <IconButton name="clear-canvas" aria-label="clear the canvas" onClick={onClearCanvas}>
          <DeleteIcon />
        </IconButton>
        </Tooltip>
      </Stack>
      <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      {countIsValid === true ? <p><b>Output:</b></p> : ""}
      {
      countIsValid === true ? 
      <ul>
        <li>
        The selected rectangle is {isIntersecting !== true ? 'not' : ''} intersecting the other rectangle.
        </li>
        <li>
        The selected rectangle is {isContained !== true ? 'not' : ''} contained within the other rectangle.
        </li>
        <li>
        The selected rectangle is {isAdjacent !== true ? 'not' : ''} adjacent to the other rectangle.
        </li>
      </ul> 
      : ""
      }
    </div>
  );
}
