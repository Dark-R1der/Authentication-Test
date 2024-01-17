import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {

  const [isAuthenticating, setIsAutheticating] =  useState(false);

  const authCtx=  useContext(AuthContext);

  async function loginHandler({email, password}){
    setIsAutheticating(true);
    try{
      const token =  await login(email, password);
      authCtx.authenticate(token);
    }catch(error){
      Alert.alert("Authetication faild", 
      "Could not log you in. Please check your credential or try again later!"
      );
      setIsAutheticating(false);
    }
  }

  if(isAuthenticating){
    return <LoadingOverlay message= "Logging you in..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
