import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import chroma from "chroma-js";

function getContrastColor(backgroundColor) {
  const rgbColor = chroma(backgroundColor).rgb();
  const luminance =
    0.2126 * rgbColor[0] + 0.7152 * rgbColor[1] + 0.0722 * rgbColor[2];
  return luminance > 128 ? "black" : "white";
}
function Carosello(props) {
  const backgroundColor = chroma.random().hex();
  const textColor = getContrastColor(backgroundColor);
  return (
    <Card style={{ width: "18rem" }} className="HoverDiv fadein">
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
              <Card.Img variant="top" src={props.src[i].media_url} />
            )}
          </Carousel.Item>
        ))}
      </Carousel>

      <Card.Body style={{ backgroundColor: backgroundColor, color: textColor }}>
        <Card.Text align="center">{props.didascalia}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Carosello;
