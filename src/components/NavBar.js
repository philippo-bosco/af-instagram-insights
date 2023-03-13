import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Navigation from "./Navigation";

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
    <nav>
      {userData && (
        <Navigation
          src={userData.profile_picture_url}
          nome={userData.username}
          following={userData.follows_count}
          followers={userData.followers_count}
        />
      )}
      {isAuth && (
        <button
          className="btn btn-danger"
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
        </button>
      )}
    </nav>
  ) : (
    <div></div>
  );
}
