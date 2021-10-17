import { useEffect } from "react";
import { useHistory } from "react-router-dom";

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
      history.push("/dashboard")
    }
  });

  const onGoogleResponse = async (response: any) => {
    addLoader();
    const res = await response;
    login(res.profileObj);
    removeLoader();
  };
  return (
    <GoogleLogin
      clientId="648058795167-3ujqqb48jnmnl6a1e7t9nu7emh15gm8i.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onGoogleResponse}
      cookiePolicy={"single_host_origin"}
    />
  );
}
