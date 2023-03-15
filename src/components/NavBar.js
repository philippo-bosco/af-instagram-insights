import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

/*
 * TODO alefuma:
 * - sistemare frontend navbar (i dati sono salvati nello useState userData)
 *        Se hai bisogno di ulteriori fields da mostrare, guarda questo link e aggiungili alla richiesta axios:
 *        https://developers.facebook.com/docs/instagram-api/reference/ig-user#fields
 * - se rimpicciolisco la finestra il pulsante logout sparisce ;(   (dagli un occhio forse ho fatto io una cazzata con css)
 * - controllare visualizzazione mobile e nel caso aggiustare
 */

export default function Navigationbar({ isAuth, toggleAuth }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null); // stato per contenere i dati dell'utente
  const storedAT = secureLocalStorage.getItem("AT");
  const storedIgID = secureLocalStorage.getItem("IgID"); //ig-user-id per effettuare le chiamate alla Graph API

  useEffect(() => {
    async function fetchData() {
      if (storedAT && storedIgID) {
        const response = await axios.get(
          `https://graph.facebook.com/v16.0/${storedIgID}?fields=followers_count,follows_count,media_count,name,profile_picture_url,username&access_token=${storedAT}`
        );
        setUserData(response.data);
      }
    }
    fetchData();
  }, [storedAT, storedIgID]);

  async function handleLogout() {
    setIsLoading(true);

    // Controlla se l'access token esiste
    const accessToken = secureLocalStorage.getItem("AT");
    if (accessToken) {
      window.FB.getLoginStatus(function (response) {
        const tokenStatus = response.authResponse?.accessToken;
        if (response.status === "connected" && tokenStatus === accessToken) {
          // Effettua il logout da Facebook solo se l'access token esiste
          window.FB.api("/me/permissions", "delete", null, () => {
            window.FB.logout();
            // Rimuovi i dati di autenticazione dalla cache del browser
            secureLocalStorage.removeItem("isAuth");
            secureLocalStorage.removeItem("AT");
            secureLocalStorage.removeItem("IgID");
            // Aggiorna lo stato dell'autenticazione
            toggleAuth(false);
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
          // Aggiorna lo stato dell'autenticazione
          toggleAuth(false);
          setIsLoading(false);
          // Torna alla pagina di login
          navigate("/login");
        }
      });
    }
  }

  return isAuth ? (
    <nav >
          {userData && (
            <>
                 <Container>
                  <div classname="container-fluid navbar-brand">
                   
                   <img
                     alt="immagine"
                     src={userData.profile_picture_url}
                     width="50"
                     height="50"
                     className="d-inline-block align-top rounded-circle margin-right"
                   />            
                 Welcome {userData.name}
                 <Button
                className="button"
                onClick={handleLogout}
                disabled={isLoading}
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
               
             <Button disabled    >post {userData.media_count}</Button>
            <Button disabled    >seguiti {userData.follows_count}</Button>
            <Button disabled    >follower {userData.followers_count}</Button>  
            </div>
            </Container>
            
             </>
          )}
        
     
       <div className="d-flex justify-content-center">
        <Link to="/home"> <Button  class="button"  >Profilo</Button></Link>
             <Link to="/stats"> <Button class ="button"  >Insights</Button></Link>
             </div>
       
       
    </nav>
  ) : (
    <div></div>
  );
}
