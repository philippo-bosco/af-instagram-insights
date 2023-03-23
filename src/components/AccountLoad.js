import secureLocalStorage from "react-secure-storage";

const getFacebookPages = responseAT => {
  //const storedAT = secureLocalStorage.getItem("AT");
  return new Promise(resolve => {
    window.FB.api("me/accounts", { access_token: responseAT }, response => {
      resolve(response.data);
      console.log(response);
    });
  });
};

const getInstagramAccountId = facebookPageId => {
  const storedAT = secureLocalStorage.getItem("AT");
  return new Promise(resolve => {
    window.FB.api(
      facebookPageId,
      {
        access_token: storedAT,
        fields: "instagram_business_account",
      },
      response => {
        resolve(
          secureLocalStorage.setItem(
            "IgID",
            response.instagram_business_account.id
          )
        );
        console.log(response);
      }
    );
  });
};

export default async function LoadInstagramAccount(responseLogin) {
  const facebookPages = await getFacebookPages(
    responseLogin.authResponse?.accessToken
  );
  await getInstagramAccountId(facebookPages[0].id);

  console.log("tutt'apposto bro");
}
