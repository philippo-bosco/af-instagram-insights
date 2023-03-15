import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
function Navigation(props) {
  return (     
      <Navbar bg="black" variant="dark" >
         
        <Container class="d-flex justify-content-center">
            <Navbar.Brand >
              <img
                alt="immagine"
                src={props.src}
                width="30"
                height="30"
                className="d-inline-block align-top rounded-circle"
              />            
            Welcome {props.nome}
          </Navbar.Brand>
        </Container>
        <ButtonGroup aria-label="Basic example" class ="btngroup">
        <Button disabled    >post {props.post}</Button>
            <Button disabled    >seguiti {props.following}</Button>
            <Button disabled    >follower {props.followers}</Button>      
        </ButtonGroup>      
      </Navbar>  
  );
 
}

export default Navigation;