import React, { useState } from "react";
import { StyleSheet, Text, View } from "@bacons/react-views";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useNavigation } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Check password strength
      if (!isPasswordStrong(password)) {
        alert("Password does not meet the strength requirements");
        return;
      }

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Assuming you have a function to update the user's profile
      await updateProfile(response.user, { displayName: name });

      alert("Successfully Signed Up");
    } catch (err) {
      alert("SignUp error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const isPasswordStrong = (password) => {
    // Add your password strength criteria here
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    setPasswordError(
      !hasLowerCase || !hasUpperCase || !hasNumber || !hasMinLength
        ? "Password must have at least one lowercase character, one uppercase character, one number, and be 8 characters minimum."
        : ""
    );

    return hasLowerCase && hasUpperCase && hasNumber && hasMinLength;
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Text style={styles.heading}>My app</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          placeholderTextColor="gray"
          autoCapitalize="words"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          placeholderTextColor="gray"
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          autoCapitalize="none"
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <Text style={styles.errorText}>{passwordError}</Text>

        <View style={styles.passwordRequirementsContainer}>
          <Text style={styles.passwordRequirementsColumn}>
            Password requirements:
            {"\n"}
            🔡 One lowercase character
            {"\n"}
            🔠 One uppercase character
          </Text>
          <Text style={styles.passwordRequirementsColumn}>
            {" "}
            {"\n"}
            🔢 One number
            {"\n"}
            ⚖️ 8 characters minimum
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000f" />
        ) : (
          <TouchableOpacity onPress={handleSignUp} style={styles.buttons}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          have an account?
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signinText}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddin: 10,
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#3d3d3d",
    color: "#fff",
  },
  heading: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "40%",
    marginTop: 20,
  },
  buttons: {
    marginHorizontal: 20,
    marginVertical: 5,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#ffd482",
    color: "#fff",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  recovery: {
    textAlign: "right",
    marginHorizontal: 20,
    color: "white",
    height: 50,
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    padding: 10,
    height: 60,
    alignItems: "center",
    textAlign: "center",
  },
  bottomText: {
    color: "white",
    fontWeight: "bold",
    justifyContent: "center",
  },
  signinText: {
    padding: 0,
    color: "yellow",
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginHorizontal: 20,
    marginTop: 5,
  },
  passwordRequirementsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  passwordRequirementsColumn: {
    color: "white",
    flex: 1,
    lineHeight: 22,
  },
});
