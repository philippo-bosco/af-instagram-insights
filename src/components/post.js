import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
{/*import fadein from 'react-animations'*/}


function Post(props) {
  return (
    <Card  style={{ width: '18rem' }} class="HoverDiv fadein" >
      {props.video===true? ( <video controls>
                    <source src={props.src} type="video/mp4" />
      </video>):(  <Card.Img variant="top" src={props.src}  />)}
      <Card.Body>
        <Card.Text align = "center">
          {props.didascalia}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Post;