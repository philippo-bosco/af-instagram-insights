import { Card, Fade } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import chroma from "chroma-js";
function getContrastColor(backgroundColor) {
  const rgbColor = chroma(backgroundColor).rgb();
  const luminance = (0.2126 * rgbColor[0]) + (0.7152 * rgbColor[1]) + (0.0722 * rgbColor[2]);
  return luminance > 128 ? 'black' : 'white';
}
function Post(props) {
  const backgroundColor = chroma.random().hex(); // replace with your dynamic background color
  const textColor = getContrastColor(backgroundColor);

  return (
    <Fade in={true} appear = {true}>
    <Card  style={{ width: '18rem' }} class="HoverDiv fadein"  >
      {props.video===true? (<>
        <Card.Header  style={{ backgroundColor: backgroundColor, color: textColor }} >Video</Card.Header>
         <video controls>
                    <source src={props.src} type="video/mp4" />
      </video></>):(  <>   <Card.Header  style={{ backgroundColor: backgroundColor, color: textColor }} >Post</Card.Header> <Card.Img variant="top" src={props.src}  /></>)}
      <Card.Body style={{ backgroundColor: backgroundColor, color: textColor }}>
        <Card.Text align = "center">
          {props.didascalia}
        </Card.Text>
      </Card.Body>
    </Card>
    </Fade>
  );
}

export default Post;