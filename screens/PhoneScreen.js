import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";

const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
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
        setCode("");
      })
      .catch((error) => {
        //error dalna hai
        alert(error);
      });
    Alert.alert("Success ✅", "Phone authentication successful!");
  };
  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text stlye={styles.text}>Login Using Otp</Text>
      <TextInput
        placeholder="Phone Number with country code"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoComplete="tel"
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.sendVerification}
        onPress={sendVerification}
      >
        <Text style = {styles.buttonText}>
             Send verificaiton
        </Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Confirmation Code"
        onChangeText={setCode}
        keyboardType="number-pad"
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.sendCode}
        onPress={confirmCode}
      >
        <Text style = {styles.buttonText}>
            Confirm verificaiton
        </Text>
      </TouchableOpacity>
      <Text>Otp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  textInput: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
  },
  sendVerification: {
    backgroundColor: "#2e64e5",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  sendCode: {
    backgroundColor: "#2e64e5",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  text: {
    color: "#000",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Otp;
