import { useState, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Footer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const storedAT = secureLocalStorage.getItem("AT");
  const storedIgID = secureLocalStorage.getItem("IgID");

  useEffect(() => {
    if (storedAT && storedIgID) {
      setIsAuthenticated(true);
      setTimestamp(new Date().toLocaleString());
    }
  }, [storedAT, storedIgID]);

  return (
    <div className="footer textinsightsdark border-top">
      {isAuthenticated ? (
        <div>
          last login {timestamp} <br></br>Powered by Phil & Ale{" "}
        </div>
      ) : (
        <div>Powered by Phil & Ale</div>
      )}
    </div>
  );
}
