import { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function Navbar({ isAuth, toggleAuth }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
