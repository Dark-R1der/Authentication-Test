import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import SignupScreen from "./SignupScreen";
import { Colors } from "../constants/styles";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const LoginOptionScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="TabScreen"
          component={TabScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Phone" component={PhoneLogin} />
      <Tab.Screen name="Email" component={CenteredContainer} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
};
const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    console.log("confirm code");
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
    setIsVerificationSent(true);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        const user = result.user;
        console.log({user});
        
        setCode("");
      })
      .catch((error) => {
        alert(error);
      });
    Alert.alert("Success ✅", "Phone authentication successful!");
    
    setIsVerificationSent(false);
  };
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 40,
          color: Colors.primary500
        }}
      >
        <TextInput
          placeholder={
            isVerificationSent ? "Enter OTP" : "Phone Number with country code"
          }
          onChangeText={isVerificationSent ? setCode : setPhoneNumber}
          value={isVerificationSent ? code : phoneNumber}
          keyboardType={isVerificationSent ? "numeric" : "phone-pad"}
          autoComplete={isVerificationSent ? "off" : "tel"}
          style={[
            styles.textInput,
            {
              borderColor: isFocused ? "#00f" : "#999",
            },
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 40,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={isVerificationSent ? confirmCode : sendVerification}
        >
          <Text style={styles.buttonText}>
            {isVerificationSent ? "Continue" : "Send verification"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const CenteredContainer = () => {
  return (
    <View >
      <SignupScreen />
    </View>
  );
};

const styles = StyleSheet.create({
    emailContainer:{
        color: Colors.primary100,
        height: 100,
        width: 100,
    },
  insideContainer: {
    height: 200,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
  container: {
    borderRadius: 10,
    overflow: "hidden",
    height: 450,
    width: 300,
    margin: 50,
    // width: 300,
    justifyContent: "center",
    backgroundColor: "blue",
  },
  text: {
    color: "white",
  },
  textInput: {
    height: 55,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  sendVerification: {
    height: 50,
    backgroundColor: "#2e64e5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default LoginOptionScreen;
