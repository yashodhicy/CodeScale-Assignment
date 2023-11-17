import React, { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'expo-router';
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const navigation = useNavigation();

    const SignIn = async () => {

        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            alert(response);
        } catch (err) {
            console.log(err);
            alert("signIn error" + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUp = () => {
        navigation.navigate('Signup');
      };
    
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View >
            <Text style={styles.heading}>My app</Text>
            <TextInput style={styles.input } value={email} placeholder='Email' autoCapitalize='none'  onChangeText={(text) => setEmail(text)} /> 
            <TextInput style={styles.input } secureTextEntry={true} value={password} placeholder='Password' autoCapitalize='none' onChangeText={(text)=>{setPassword(text)}} />  
            {loading ? <ActivityIndicator size="large" color="#0000f" /> : 
                <>
                <Button title="Login" onPress={() => SignIn()} />
                <Button title="Sign Up" onPress={handleSignUp} />
                </>
            }
        </View>
        </KeyboardAvoidingView>
    );
}

export default Login;


const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: "#2a2a2a",
        color: "#fff",
    },
    input: {
        marginHorizontal:20,
        marginVertical:4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#3d3d3d'
    },
    heading: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:300,
        marginTop:20
    },
});