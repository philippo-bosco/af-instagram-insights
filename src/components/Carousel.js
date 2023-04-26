import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import chroma from "chroma-js";
import { React, useState } from "react";
import "../styles/post.css";

function getContrastColor(backgroundColor) {
  const rgbColor = chroma(backgroundColor).rgb();
  const luminance =
    0.2126 * rgbColor[0] + 0.7152 * rgbColor[1] + 0.0722 * rgbColor[2];
  return luminance > 128 ? "black" : "white";
}

function Carosello(props) {
  const backgroundColor = chroma.random().hex();
  const textColor = getContrastColor(backgroundColor);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div
        className={`post ${isFlipped ? "flipped" : ""}`}
        onMouseEnter={flipCard}
        onTouchStart={flipCard}
        onMouseLeave={flipCard}
        onTouchEnd={flipCard}
      >
        <Card
          style={{ width: "18rem" }}
          className="HoverDiv fadein card-front h-100"
          fluid="true"
        >
          <Card.Header
            style={{ backgroundColor: backgroundColor, color: textColor }}
          >
            Raccolta
          </Card.Header>
          <Carousel>
            {props.src.map((index, i) => (
              <Carousel.Item key={i}>
                {props.src[i].media_type === "VIDEO" ? (
                  <video controls>
                    <source src={props.src[i].media_url} type="video/mp4" />
                  </video>
                ) : (
                  <Card.Img
                    variant="top"
                    src={props.src[i].media_url}
                    className="h-100"
                  />
                )}
              </Carousel.Item>
            ))}
          </Carousel>

          <Card.Body
            style={{ backgroundColor: backgroundColor, color: textColor }}
          ></Card.Body>
        </Card>
        <Card
          className="card-back"
          style={{ backgroundColor: backgroundColor }}
          fluid="true"
        >
          <Card.Body className=" justify-content-center align-items-center">
            <h5 className="text-white">Dati del post</h5>
            <p className="text-white">like {props.numero_like}</p>
            <p className="text-white">
              numero commenti {props.numero_commenti}
            </p>
            <p className="text-white">data e ora {props.datetime}</p>
            <p className="text-white">didascalia : {props.didascalia}</p>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Carosello;
