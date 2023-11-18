import React, { useState } from "react";
import { StyleSheet, Text, View } from "@bacons/react-views";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";
import { ActivityIndicator, Button, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useNavigation } from "expo-router";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

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

            const response = await createUserWithEmailAndPassword(auth, email, password);
            
            // Assuming you have a function to update the user's profile
            await updateProfile(response.user, { displayName: name });

            console.log(auth);
        } catch (err) {
            console.log(err);
            alert("SignUp error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View>
                <Text style={styles.heading}>My app</Text>
                <TextInput style={styles.input} value={name} placeholder='Name' autoCapitalize='words' onChangeText={(text) => setName(text)} />
                <TextInput style={styles.input} value={email} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.input} secureTextEntry={true} value={password} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)} />
                <TextInput style={styles.input} secureTextEntry={true} value={confirmPassword} placeholder='Confirm Password' autoCapitalize='none' onChangeText={(text) => setConfirmPassword(text)} />

                {loading ? <ActivityIndicator size="large" color="#0000f" /> :
                    <>
                        <Button title="Signup" onPress={handleSignUp} />
                        <Button title="Login" onPress={handleLogin} />
                    </>
                }
            </View>
        </KeyboardAvoidingView>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        backgroundColor: "#0000"
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 300,
        marginTop: 20
    },
});
