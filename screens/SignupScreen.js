import { useContext, useState } from "react";

import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import AuthContent from "../components/Auth/AuthContent";

function SignupScreen() {
  const [isAuthenticating, setIsAutheticating] = useState(false);

  const authCtx = useContext(AuthContext);
  async function signupHandler({ email, password }) {
    setIsAutheticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token );
    } catch (error) {
      Alert.alert(
        "Authetication faild",
        "Could not create your account. Please check your credential or try again later!"
      );
      setIsAutheticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
