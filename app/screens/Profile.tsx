import { Text, View } from "@bacons/react-views";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = FIREBASE_AUTH.currentUser;
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // Navigate to the root page (Login)
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
    
    <View style={styles.container}>
    <Text style={styles.heading}>My app</Text>
      {user && (
        <>
          <Text style={styles.input}>Name: {user.displayName}</Text>
          <Text style={styles.input}>Email: {user.email}</Text>
        </>
      )}
    </View>
    <View style={styles.bottomTextContainer}>
      <TouchableOpacity
        onPress={handleLogout} style={styles.buttons}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
  </View>
  </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container : {
      flex:1,
      paddin:10,
      backgroundColor: "#2a2a2a",
      color: "#fff",
  },
  input: {
      marginHorizontal:20,
      marginVertical:10,
      height: 50,
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
      marginBottom:100,
      marginTop:20
  },
  buttons: {
      marginVertical:5,
      height: 50,
      width: '100%',
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
      bottom: 20,
      width: '100%',
      padding: 10,
      textAlign: 'center',
      alignItems:'stretch'
  }

});