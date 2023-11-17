import { Text, View } from "@bacons/react-views";
import React from "react";
import { Button } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      // Navigate to the root page (Login)
      navigation.navigate('Login')
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Profile;


