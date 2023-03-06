import { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

/**
 * problema: il logout ha bisogno dell'access token ma non so come passarglielo
 */
export default function Navbar({ isAuth, toggleAuth }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    // Effettua il logout da Facebook
    window.FB.logout(response => {
      console.log(response);
      // Rimuove le informazioni di accesso dallo storage locale
      secureLocalStorage.removeItem("isAuth");
      secureLocalStorage.removeItem("AT");
      // Aggiorna lo stato dell'autenticazione
      toggleAuth(false);
      setIsLoading(false);
      // Torna alla pagina di login
      navigate("/login");
    });
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
