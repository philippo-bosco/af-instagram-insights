import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Typewriter from "typewriter-effect";

//import custom
import "../styles/PageNotFoundStyle.css";

export default function PageNotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const storedIsAuth = secureLocalStorage.getItem("isAuth");

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, countdown * 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container" style={{ color: "white" }}>
      <Typewriter
        onInit={typewriter => {
          typewriter
            .typeString(
              "<strong style='font-size: 2em;'>404, Page not Found!</strong>"
            )
            .pauseFor(5000)
            .start();
        }}
      />
      <br />
      {storedIsAuth ? (
        <p>
          Redirecting to Home in <strong>{countdown} </strong>
          seconds.
        </p>
      ) : (
        <p>
          Redirecting to Login in <strong>{countdown} </strong>
          seconds.
        </p>
      )}
    </main>
  );
}
