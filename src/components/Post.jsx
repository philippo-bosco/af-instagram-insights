import { Card, Fade } from "react-bootstrap";
import chroma from "chroma-js";
import { useState } from "react";
import "../styles/post.css"; // importiamo il file CSS che contiene l'animazione

function getContrastColor(backgroundColor) {
  const rgbColor = chroma(backgroundColor).rgb();
  const luminance =
    0.2126 * rgbColor[0] + 0.7152 * rgbColor[1] + 0.0722 * rgbColor[2];
  return luminance > 128 ? "black" : "white";
}

function Post(props) {
  const backgroundColor = chroma.random().hex();
  const textColor = getContrastColor(backgroundColor);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <Fade in={true} appear={true}>
        <div
          className={`post ${isFlipped ? "flipped" : ""}`}
          onMouseEnter={flipCard}
          onTouchStart={flipCard}
          onMouseLeave={flipCard}
          onTouchEnd={flipCard}
        >
          <Card
            style={{ backgroundColor: backgroundColor }}
            fluid="true"
            className="card-back"
          >
            <Card.Body className=" justify-content-center align-items-center">
              <div xs={12} md={6}>
                <h5 className="text-white">Dati del post</h5>
                <p className="text-white">like {props.numero_like}</p>
                <p className="text-white">
                  numero commenti {props.numero_commenti}
                </p>
                <p className="text-white">data e ora {props.datetime}</p>
                <p className="text-white">didascalia : {props.didascalia}</p>
              </div>
            </Card.Body>
          </Card>

          <Card fluid="true" className="card-front">
            {props.video === true ? (
              <>
                <Card.Header
                  style={{ backgroundColor: backgroundColor, color: textColor }}
                >
                  Video
                </Card.Header>
                <video controls autoPlay loop muted>
                  <source src={props.src} type="video/mp4" />
                </video>
              </>
            ) : (
              <>
                <Card.Header
                  style={{ backgroundColor: backgroundColor, color: textColor }}
                >
                  Post
                </Card.Header>
                <Card.Img
                  variant="top"
                  src={props.src}
                  fluid="true"
                  className="h-auto"
                />
              </>
            )}
            <Card.Body
              style={{ backgroundColor: backgroundColor, color: textColor }}
            ></Card.Body>
          </Card>
        </div>
      </Fade>
    </>
  );
}

export default Post;
