import { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

import { GoogleLogin } from "react-google-login";

import { GlobalLoaderModule } from "components";

import { useAuth } from "utils/hooks";

export function Login() {
  const { useGlobalLoader } = GlobalLoaderModule;

  const { login, loginObj } = useAuth();
  const history = useHistory();
  const { addLoader, removeLoader } = useGlobalLoader();

  useEffect(() => {
    if (loginObj) {
      history.push("/dashboard");
    }
  });

  const onGoogleResponse = async (response: any) => {
    addLoader();
    const res = await response;
    login(res.profileObj);
    removeLoader();
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-primary)",
      }}
    >
      <div className="text-center border p-5">
        <h1 className="text-white">Pharma Inc.</h1>
        <GoogleLogin
          clientId="648058795167-3ujqqb48jnmnl6a1e7t9nu7emh15gm8i.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={onGoogleResponse}
          cookiePolicy={"single_host_origin"}
        />
        <h4 className="text-white mt-4">Or</h4>
        <Link to="/dashboard">
            <h5 className="text-white">enter without login</h5>
        </Link>
      </div>
    </div>
  );
}
