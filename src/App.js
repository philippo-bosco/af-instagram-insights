import "./App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState("");

  // Controllo se l'utente è già autenticato con Facebook
  /*  useEffect(() => {
    window.FB.getLoginStatus(response => {
      setFacebookUserAccessToken(response.authResponse?.accessToken);
    });
  }, []);*/

  // LOGIN con Facebook
  const logInToFB = () => {
    window.FB.login(
      response => {
        setFacebookUserAccessToken(response.authResponse?.accessToken);
      },
      {
        // Scopes that allow us to publish content to Instagram
        scope: "instagram_basic,pages_show_list",
      }
    );
  };

  // LOGOUT da Facebook
  const logOutOfFB = () => {
    window.FB.logout(() => {
      setFacebookUserAccessToken(undefined);
    });
  };

  // GET pagine facebook Instagram Business Account
  //TEMPORANEAMENTE DEVO CAPIRE A COSA SERVE STA COSA
  /*  const getFacebookPages = () => {
    return new Promise(resolve => {
      window.FB.api(
        "me/accounts",
        { access_token: facebookUserAccessToken },
        response => {
          resolve(response.data);
        }
      );
    });
  };*/
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
                        <div className="text-center pt-1 mb-5 pb-1">
                          {facebookUserAccessToken ? (
                            <button
                              onClick={logOutOfFB}
                              className="btn action-btn"
                            >
                              Log out of Facebook
                            </button>
                          ) : (
                            <button
                              onClick={logInToFB}
                              className="btn action-btn"
                              data-width=""
                              data-size="large"
                              data-button-type="continue_with"
                              data-layout="rounded"
                              data-auto-logout-link="false"
                              data-use-continue-as="false"
                            >
                              Login with Facebook
                            </button>
                          )}
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
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
        crossOrigin="anonymous"
      ></script>
      {facebookUserAccessToken ? (
        <section className="app-section">
          {console.log("FATTO BRO SIAMO LOGGATI")}
        </section>
      ) : null}
    </div>
    /*
    <main id="app-main">
      <div>
        <section className="app-section">
          <h3>1. Log in with Facebook</h3>
          {facebookUserAccessToken ? (
            <button onClick={logOutOfFB} className="btn action-btn">
              Log out of Facebook
            </button>
          ) : (
            <button onClick={logInToFB} className="btn action-btn">
              Login with Facebook
            </button>
          )}
        </section>
      </div>
      {facebookUserAccessToken ? (
        <section className="app-section">
          console.log("FATTO BRO SIAMO LOGGATI")
        </section>
      ) : null}
    </main>
  */
  );
}

export default App;
