import { onAuthStateChanged } from 'firebase/auth';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import Characters from './screens/Characters';
import Profile from './screens/Profile';
import Login from "./screens/Login";
import SignUp from './screens/SignUp';
import { StyleSheet, View , Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const setupSplashScreen = async () => {
        try {
          await SplashScreen.preventAutoHideAsync();
          setTimeout(async () => {
            await SplashScreen.hideAsync();
          }, 4000);
        } catch (error) {
          console.error('Error setting up splash screen:', error);
        }
    };
  
    setupSplashScreen();

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log('authUser', authUser);
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  return (
    <View style={styles.appContainer}>
    
      <Stack.Navigator initialRouteName={user ? 'Inside' : 'Login'} screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Inside" component={InsideLayout} />
          </>
        ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
        </>

        )}
      </Stack.Navigator>
    
    </View>
  );
  
};

const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="characters" component={Characters} screenOptions={{ headerShown: false }} />
      <InsideStack.Screen name="profile" component={Profile}  screenOptions={{ headerShown: false }}/>    
    </InsideStack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
  });