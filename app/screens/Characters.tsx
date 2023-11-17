import { Text, View } from "@bacons/react-views";
import React from "react";
import { Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Characters = ({navigation} : RouterProps) => {
  return (
    <View>
        <Button onPress={() => navigation.navigate('profile')} title="profile" />
      <Text>Char</Text>
    </View>
  );
};

export default Characters;
