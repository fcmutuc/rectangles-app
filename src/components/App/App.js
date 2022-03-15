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
  const { selectedObjects, editor, onReady } = useFabricJSEditor();
  const [rectangleCount, setRectangleCount] = useState(0);
  const [countIsValid, setCountIsValid] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isContained, setIsContained] = useState(false);

  const onAddRectangle = () => {
    if (rectangleCount === 2) {
      alert('Only two rectangles are currently allowed.');
      return false;
    }
    if (rectangleCount >= 0 || rectangleCount < 2) {
      setCountIsValid(((rectangleCount + 1) === 2) ? true : false);
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
    setCountIsValid(0);
  };

  useEffect(() => {

    const printCoordinates = (options) => {
      console.log('in printCoordinates()');
      console.log('options ->');
      console.log(options);
      options.target.setCoords();
      editor.canvas.forEachObject(function(obj) {
        if (obj === options.target) {
            return;
        }
        obj.set('opacity' ,options.target.intersectsWithObject(obj) ? 0.5 : 1);
        setIsContained(options.target.isContainedWithinObject(obj));
        if (options.target.isContainedWithinObject(obj)) {
          console.log('selected object is contained with another');
        } else {
          console.log('selected object is not contained with another');
        }
        setIsIntersecting(options.target.intersectsWithObject(obj));
        if (options.target.intersectsWithObject(obj)) {
          console.log('selected object is intersecting with another');
        } else {
          console.log('selected object is not intersecting with another');
        }
      });
    };

    console.log('in useEffect');
    if (selectedObjects !== undefined) {
      console.log('selectedObjects ->');
      console.log(selectedObjects);
    }
    if (editor?.canvas !== undefined) {
      console.log('editor.canvas.getActiveObjects() ->');
      console.log(editor.canvas.getActiveObjects());
      editor.canvas.on({
        'object:moving': printCoordinates,
        'object:scaling': printCoordinates,
        'object:rotating': printCoordinates
      });
    }
  }, [rectangleCount, editor?.canvas, selectedObjects])

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
      {
      countIsValid === true ? 
      <p>The selected rectangle is {isIntersecting !== true ? 'not' : ''} intersecting the other rectangle.<br/>The selected rectangle is {isContained !== true ? 'not' : ''} contained within the other rectangle.</p> 
      : ""
      }
    </div>
  );
}
