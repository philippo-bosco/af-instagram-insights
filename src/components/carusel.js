import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
function Carosello(props) {
  return (
    <Card style={{ width: '18rem' }} class="HoverDiv fadein">
     <Carousel>
     
      {props.src[0]!== undefined ? (
     <Carousel.Item>
      {props.src[0].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[0].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[0].media_url}  />)}
      </Carousel.Item>
   ):(<div ></div>)}
      
      
      {props.src[1] !== undefined ? (
    <Carousel.Item>
      {props.src[1].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[1].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[1].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
      
     
      {props.src[2] !== undefined ? (
    <Carousel.Item>
      {props.src[2].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[2].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[2].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
    
      
      {props.src[3] !== undefined ? (
        <Carousel.Item>
      {props.src[3].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[3].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[3].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
      
      
      {props.src[4] !== undefined ? (
        <Carousel.Item>
      {props.src[4].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[4].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[4].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
      
      
      {props.src[5] !== undefined ? (
        <Carousel.Item>
      {props.src[5].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[5].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[5].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
    
      
      {props.src[6]!== undefined ? (
        <Carousel.Item>
      {props.src[6].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[6].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[6].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
      
      
      {props.src[7] !== undefined ? (
        <Carousel.Item>
     { props.src[7].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[7].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[7].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
     
      
      {props.src[8] !== undefined ? (
        <Carousel.Item>
     {props.src[8].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[8].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[8].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
      
     
      {props.src[9] !== undefined ? (
         <Carousel.Item>
      {props.src[9].media_type==="VIDEO"? ( <video controls>
                    <source src={props.src[9].media_url} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src[9].media_url}  />)}
      </Carousel.Item>
   ):(<div></div>)}
      
      <Card.Body>
        <Card.Text align = "center">
          {props.didascalia}
        </Card.Text>
      </Card.Body>
     </Carousel>
    </Card>
  );
}

export default Carosello;