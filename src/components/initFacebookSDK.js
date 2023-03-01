const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;

export default function initFacebookSDK() {
  return new Promise(resolve => {
    // Wait for the Facebook SDK to initialize before starting the React app.
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v15.0",
      });

      window.FB.AppEvents.logPageView(); //non so cosa faccia, documentarsi
      /*TODO: aggiungere controllo se si è già autorizzati, verrà eseguito prima della pagina di login
        se si è già autorizzati assegnare subito valori agli useStates, così li controllo nel login
        e nel caso li rimando subito alla home*/
      resolve();
    };

    // Load the Facebook SDK script.
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  });
}
