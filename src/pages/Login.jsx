import React, { useEffect } from "react";
import { AccountService } from "../components/AccountService";

export default function Login({ history }) {
  useEffect(() => {
    window.FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  });

  // Controllo se l'utente è già stato autenticato
  //duplicato di AccountService.statusChangeCallback WARNING
  function statusChangeCallback(response) {
    console.log("statusChangeCallback");
    console.log(response);
    if (response.status === "connected") {
      history.push("/");
    }
  }

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
                        <div className="card-body">
                          <button
                            className="btn btn-facebook"
                            onClick={AccountService.Login}
                          >
                            <i className="fa fa-facebook mr-1"></i>
                            Login with Facebook
                          </button>
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
    </div>
  );
}
