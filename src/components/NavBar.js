import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button, Navbar, Nav } from "react-bootstrap";

export default function Navigationbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null); // stato per contenere i dati dell'utente
  const storedAT = secureLocalStorage.getItem("AT");
  const storedIgID = secureLocalStorage.getItem("IgID");

  useEffect(() => {
    const fetchData = async () => {
      if (storedAT && storedIgID) {
        setIsAuth(true);
        const response = await axios.get(
          `https://graph.facebook.com/v16.0/${storedIgID}?fields=followers_count,follows_count,media_count,name,profile_picture_url,username&access_token=${storedAT}`
        );
        setUserData(response.data);
        console.log(response.data);
      } else {
        setIsAuth(false);
      }
    };
    fetchData();
  }, [storedIgID, storedAT]);

  async function handleLogout() {
    setIsLoading(true);

    // Controlla se l'access token esiste
    if (storedAT) {
      window.FB.getLoginStatus(function (response) {
        const tokenStatus = response.authResponse?.accessToken;
        if (response.status === "connected" && tokenStatus === storedAT) {
          // Effettua il logout da Facebook solo se l'access token corrisponde
          window.FB.api("/me/permissions", "delete", null, () => {
            window.FB.logout();
            console.clear();
            // Rimuove i dati di autenticazione dalla cache del browser
            secureLocalStorage.removeItem("isAuth");
            secureLocalStorage.removeItem("AT");
            secureLocalStorage.removeItem("IgID");
            secureLocalStorage.removeItem("lastPost");
            // Aggiorna lo stato dell'autenticazione
            setIsAuth(false);
            setIsLoading(false);
            // Torna alla pagina di login
            navigate("/login");
          });
        } else {
          window.FB.logout();
          // Rimuovi i dati di autenticazione dalla cache del browser
          secureLocalStorage.removeItem("isAuth");
          secureLocalStorage.removeItem("AT");
          secureLocalStorage.removeItem("IgID");
          secureLocalStorage.removeItem("lastPost");
          // Aggiorna lo stato dell'autenticazione
          setIsAuth(false);
          setIsLoading(false);
          // Torna alla pagina di login
          navigate("/login");
        }
      });
    }
  }

  return isAuth ? (
    <>
      {userData && (
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          sticky="top"
          style={{
            height: "100%",
            margin: "0",
            padding: "0",
            backgroundColor: "#000",
          }}
        >
          <Container
            fluid
            style={{ height: "100%", margin: "0", padding: "0" }}
          >
            <Navbar.Brand style={{ display: "flex", alignItems: "center" }}>
              <img
                alt="immagine"
                src={userData.profile_picture_url}
                width="50"
                height="50"
                className="d-inline-block align-top rounded-circle"
              />
              <span style={{ marginLeft: "10px" }}>
                Welcome {userData.name}
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className="navbarStats" disabled>
                  post {userData.media_count}
                </Nav.Link>
                <Nav.Link className="navbarStats" disabled>
                  seguiti {userData.follows_count}
                </Nav.Link>
                <Nav.Link className="navbarStats" disabled>
                  follower {userData.followers_count}
                </Nav.Link>
              </Nav>
              <Nav>
                <Link to="/">
                  <Button className="button">Profilo</Button>
                </Link>
                <Link to="/stats">
                  <Button className="button">Insights</Button>
                </Link>
                <Button
                  className="button mb-3 floatright"
                  onClick={handleLogout}
                  disabled={isLoading}
                  variant="outline-light"
                >
                  {isLoading && (
                    <span
                      className="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  ) : (
    <div></div>
  );
}
