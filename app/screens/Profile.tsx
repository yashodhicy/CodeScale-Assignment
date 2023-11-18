import { Text, View } from "@bacons/react-views";
import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

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
    <View>
      <Text>Profile</Text>
      {user && (
        <>
          <Text>Name: {user.displayName}</Text>
          <Text>Email: {user.email}</Text>
        </>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;
