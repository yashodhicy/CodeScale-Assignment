import { onAuthStateChanged } from 'firebase/auth';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../firebaseConfig";
import Characters from './screens/Characters';
import Profile from './screens/Profile';
import Login from "./screens/Login";
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './screens/SignUp';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log('authUser', authUser);
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer independent={true}>
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
    </NavigationContainer>
  );
};

const InsideStack = createNativeStackNavigator();

const InsideLayout = () => {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="characters" component={Characters} />
      <InsideStack.Screen name="profile" component={Profile} />    
    </InsideStack.Navigator>
  );
};

export default AppNavigator;
