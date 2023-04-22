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
    <div className="footer">
      {isAuthenticated ? <p>{timestamp}</p> : <p>Powered by Phil & Ale</p>}
    </div>
  );
}
