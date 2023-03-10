import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

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
          `https://graph.facebook.com/v13.0/${storedIgID}?fields=followers_count,follows_count,media_count,name,profile_picture_url,username&access_token=${storedAT}`
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
        }
      });
    }
  }

  return isAuth ? (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        My App
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {userData && (
            <li className="nav-item">
              <div className="d-flex align-items-center">
                <img
                  src={userData.profile_picture_url}
                  alt="profile"
                  width="40"
                  height="40"
                  className="rounded-circle mr-2"
                />
                <div>
                  <div>{userData.username}</div>
                  <div className="small text-muted">
                    {userData.followers_count} followers |{" "}
                    {userData.follows_count} following | {userData.media_count}{" "}
                    posts
                  </div>
                </div>
              </div>
            </li>
          )}
          {isAuth && (
            <li className="nav-item">
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
            </li>
          )}
        </ul>
      </div>
    </nav>
  ) : (
    <div></div>
  );
}
