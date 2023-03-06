export default function Navbar({ isAuth }) {
  //TODO: - aggiungere bottone "logout" nella navbar che cancelli l'accesso da TUTTO (localstorage, useState, cookie facebook)"
  return isAuth ? (
    <div>
      <p>questa è la navbar</p>
    </div>
  ) : (
    <div></div>
  );
}
