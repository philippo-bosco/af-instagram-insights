import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { NavLink } from "react-router-dom";

function Navigation(props) {
  return (
    <Navbar bg="black" variant="dark">
      <Container>
        <Navbar.Brand>
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
      <ButtonGroup aria-label="Basic example" className="btngroup">
        <Button disabled>seguiti {props.following}</Button>
        <Button disabled>follower {props.followers}</Button>
        <NavLink exact="true" to="/">
          <Button className="button">Profilo</Button>
        </NavLink>
        <NavLink exact="true" to="/stats">
          <Button className="button">Insights</Button>
        </NavLink>
        {props.logout}
      </ButtonGroup>
    </Navbar>
  );
}

export default Navigation;
