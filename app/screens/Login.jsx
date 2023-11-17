import React, { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native"
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { TextInput } from 'react-native-gesture-handler';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
const Login = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = FIREBASE_AUTH;

    const signIn = async () => {
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

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        }catch (err) {
            console.log(err);
            alert("signUp error" + err.message);
        }finally {
            setLoading(false);
        }

    };
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View >
            <Text style={styles.heading}>My app</Text>
            <TextInput style={styles.input } value={email} placeholder='Email' autoCapitalize='none'  onChangeText={(text) => setEmail(text)} /> 
            <TextInput style={styles.input } secureTextEntry={true} value={password} placeholder='Password' autoCapitalize='none' onChangeText={(text)=>{setPassword(text)}} />  
            {loading ? <ActivityIndicator size="large" color="#0000f" /> : 
                <>
                <Button title="Login" onPress={() => signIn()} />
                <Button title="Signup" onPress={() => signUp()} />
                </>
            }
        </View>
        </KeyboardAvoidingView>
    );
}

export default Login;


const styles = StyleSheet.create({
    container : {
        marginHorizontal:20,
        flex:1,
        backgroundColor: "#0000"
    },
    input: {
        marginVertical:4,
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
        marginBottom:300,
        marginTop:20
    },
});