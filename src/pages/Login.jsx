import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

//import custom
import "../styles/login.css";
import LoadInstagramAccount from "../components/AccountLoad";

/*
 * TODO alefuma:
 * - rendere il bottone di facebook login carino
 * - sistemare locazione logo instagram (mettere in posizione più centrale e separata dal testo se riesci)
 * - controllare visualizzazione mobile e nel caso aggiustare
 */

export default function Login({ isAuth, toggleAuth, AT, ToggleAT }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const storedisAuth = secureLocalStorage.getItem("isAuth");
  const storedAT = secureLocalStorage.getItem("AT");
  const storedIgID = secureLocalStorage.getItem("IgID");

  useEffect(() => {
    if (storedisAuth && storedAT && storedIgID) {
      navigate("/");
    }
  }, [storedisAuth, storedAT, storedIgID, navigate]);

  /*
  FUNZIONAMENTO useEffect --> se viene dichiarato e ci passiamo dentro qualsiasi cosa senza mettere un array finale, 
  useEffect verrà eseguito ad ogni render.
  Se viene dichiarato alla fine, useEffect verrà eseguito solo al primo render.
  Props e State dichiarati nell'array significa che useEffect verrà eseguto ogni volta che il loro stato verrà cambiato. 
  */

  async function loginToFB() {
    setIsLoading(true);

    window.FB.login(
      response => {
        console.log(response);
        statusChangeCallback(response);
      },
      {
        scope: "instagram_basic,pages_show_list, pages_read_engagement",
      }
    );
  }

  async function statusChangeCallback(response) {
    //setIsLoading(false);

    if (response.status === "connected") {
      toggleAuth(true);
      ToggleAT(response.authResponse?.accessToken);
      // Salvataggio nel securelocalStorage
      secureLocalStorage.setItem("isAuth", true);
      secureLocalStorage.setItem("AT", response.authResponse?.accessToken);

      await LoadInstagramAccount(response);
      console.log(secureLocalStorage.getItem("IgID"));
    } else {
      toggleAuth(false);
      ToggleAT("");
      // Salvataggio nel securelocalStorage
      secureLocalStorage.setItem("isAuth", false);
      secureLocalStorage.setItem("AT", "");
    }
    setIsLoading(false);
  }

  return (
    <div>
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="logo-outer">
                        <div className="insta-icon">
                          <span></span>
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">
                          AF Instagram Insights
                        </h4>
                      </div>

                      <form>
                        <p>Please login to your account</p>
                        <div className="card-body">
                          <button
                            className="btn btn-facebook"
                            onClick={loginToFB}
                            disabled={isLoading}
                          >
                            {isLoading && (
                              <span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            )}
                            <i className="fa fa-facebook mr-1"></i>
                            Login with Facebook
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Una Applicazione ReactJS!</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}