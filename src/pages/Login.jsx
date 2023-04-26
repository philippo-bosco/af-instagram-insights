import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { Container, Row, Col, Button } from "react-bootstrap";

//import custom
import "../styles/login.css";
import LoadInstagramAccount from "../components/AccountLoad";

export default function Login() {
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
        scope:
          "instagram_basic,pages_show_list,pages_read_engagement,instagram_manage_insights",
      }
    );
  }

  async function statusChangeCallback(response) {
    if (response.status === "connected") {
      // Salvataggio nel securelocalStorage
      secureLocalStorage.setItem("isAuth", true);
      secureLocalStorage.setItem("AT", response.authResponse?.accessToken);

      await LoadInstagramAccount(response);
      console.log(secureLocalStorage.getItem("IgID"));
    } else {
      // Salvataggio nel securelocalStorage
      secureLocalStorage.setItem("isAuth", false);
      secureLocalStorage.setItem("AT", "");
    }
    setIsLoading(false);
  }

  return (
    <>
      <Container>
        <Row xs={1} sm={1} lg={2} className="border-bottom bordo">
          <Col className="mb-5 ">
            <div className="text-center align-middle">
              <center>
                <div className="insta-icon">
                  <span></span>
                </div>
              </center>

              <h4 className="mt-3 mb-5 pb-1 text align-middle">
                We are AF Instagram Insights
              </h4>
              <p className="text align-middle">Please login to your account</p>

              <Button
                className="button mb-3 gradient-custom-2 "
                disabled={isLoading}
                onClick={loginToFB}
                variant="outline-light"
              >
                {isLoading && (
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Login with Facebook <br></br>
                <i className="fa fa-facebook mr-1"> </i>
              </Button>
            </div>
          </Col>

          <Col className="mb-5 justify-content-center gradient-custom-2 text text-center ">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4 trasparent">
              <h4 className="mb-4">AF INSTAGRAM INSIGHTS</h4>
              <p className="small mb-0">
                Tutte le tue statistiche di Instagram in un solo posto.{" "}
                <br></br>Semplice, chiaro e veloce.<br></br>
                NB per usare l'applicazione devi avere una pagina instagram
                aziendale connessa a una pagina Facebook.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
