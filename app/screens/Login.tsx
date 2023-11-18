    import React, { useState } from 'react';
    import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
    import { FIREBASE_AUTH } from '../../firebaseConfig';
    import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
    import {  signInWithEmailAndPassword } from 'firebase/auth';
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
                <TextInput style={styles.input } value={email} placeholder='Email' placeholderTextColor='gray' autoCapitalize='none'  onChangeText={(text) => setEmail(text)} /> 
                <TextInput style={styles.input } secureTextEntry={true} value={password} placeholder='Password' placeholderTextColor='gray' autoCapitalize='none' onChangeText={(text)=>{setPassword(text)}} /> 
                <Text style={styles.recovery}> Forgot password ?</Text> 
                {loading ? <ActivityIndicator size="large" color="#0000f" /> : 
                    <>
                    <TouchableOpacity onPress={() => SignIn()} style={styles.buttons}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    </>
                }
            </View>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>
                Don't have an account? 
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={styles.signUpText}> Sign Up</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </KeyboardAvoidingView>
        );
    }

    export default Login;


    const styles = StyleSheet.create({
        container : {
            flex:1,
            paddin:10,
            backgroundColor: "#2a2a2a",
            color: "#fff",
        },
        input: {
            marginHorizontal:20,
            marginVertical:4,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#3d3d3d',
            color: "#fff",
            
        },
        heading: {
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom:300,
            marginTop:20
        },
        buttons: {
            marginHorizontal:20,
            marginVertical:5,
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: '#ffd482',
            color: "#fff"
        },
        buttonText: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
        recovery: {
            textAlign: 'right',
            marginHorizontal:20,
            color:'white',
            height: 50,
        },
        bottomTextContainer: {
            position: 'absolute',
            bottom: 10,
            width: '100%',
            padding: 10,
            height:60,
            alignItems: 'center',
            textAlign: 'center',
            
        },
        bottomText: {
            color: 'white',
            fontWeight: 'bold',
            justifyContent: 'center'
        },
        signUpText: {
            padding:0,
            color: 'yellow',
            textAlign: 'center',
            textDecorationLine: 'underline',
            fontWeight: 'bold',
        },
    });