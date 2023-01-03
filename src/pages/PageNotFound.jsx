import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }, [navigate]);

  return (
    <main className="container">
      <h1>Page Not Found | 404</h1>
      <p>You will be redirected the homepage</p>
    </main>
  );
}
