import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
function Navigation(props) {
  return (     
      <Navbar bg="black" variant="dark" >
        <Container>
          <Navbar.Brand >
            <img
              alt="immagine"
              src={props.src}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Welcome {props.nome} {props.cognome}
          </Navbar.Brand>
        </Container>
        <ButtonGroup aria-label="Basic example" class ="btngroup">
            <Button disabled  class="button"  >seguiti {props.seguiti}</Button>
            <Button disabled  class="button"  >follower {props.follow}</Button>
             <Link to="/home"> <Button  class="button"  >Profilo</Button></Link>
             <Link to="/stats"> <Button class ="button"  >Insights</Button></Link>
            </ButtonGroup>
      </Navbar>  
  );
 
}

export default Navigation;