import { Text, View, Image } from "@bacons/react-views";
import React, { useState, useEffect } from 'react';
import { Button } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import axios from 'axios';

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

interface Character {
  id: number;
  fullName: string;
  imageUrl: string;
  title : string;
}

const Characters: React.FC<RouterProps> = ({ navigation }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://thronesapi.com/api/v2/Characters');
      const limitedCharacters = response.data.slice(0, 10);
      setCharacters(limitedCharacters);
    } catch (error) {
      console.error('Error fetching characters:', error.message);
    }
  };
  return (
    <View>
      <Button onPress={() => navigation.navigate('profile')} title="profile" />
      <Text>Character List</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.fullName}</Text>
            <Text>{item.title}</Text>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 100, height: 100 }} // Adjust the size as needed
            />
          </View>
        )}
      />
    </View>
  );
};

export default Characters;
