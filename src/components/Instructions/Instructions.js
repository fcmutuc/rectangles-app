import React from 'react';
import './Instructions.css';

const Instructions = () => (
  <div className="instructions">
    <p>
      You can add up to two rectangles to the drawing canvas, the area inside the box below.<br/><br/>
      When there are two rectangles on the drawing canvas, you can see if the following:
    </p>
    <ul>
      <li>
        the two rectangles intersect
      </li>
      <li>
        one of the rectangles is wholly contained within another rectangle
      </li>
      <li>
        the two rectangles are adjacent
      </li>
    </ul>
  </div>
)

export default Instructions;
