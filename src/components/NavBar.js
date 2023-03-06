export default function Navbar({ isAuth }) {
  //TODO: nascondere la navbar quando non si è ancora effettuato il login
  return isAuth ? (
    <div>
      <p>questa è la navbar</p>
    </div>
  ) : (
    <div></div>
  );
}
