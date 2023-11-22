import { Text, View, Image } from "@bacons/react-views";
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
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
     <TouchableOpacity onPress={() => navigation.navigate('profile')} style={styles.profile}>
     <Image
        source={require('../../assets/setting.png')}
        style={styles.settingIcon}
      />
      </TouchableOpacity>

      <FlatList
        style={styles.container}
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.characterContainer}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.characterImage}
            />
            <View style={styles.characterInfo}>
              <Text style={styles.fullName}>{item.fullName}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({
  characterContainer: {
    position:'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: "#2a2a2a",
    zIndex:0,
  },
  characterImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    zIndex:0,
  },
  characterInfo: {
    flex: 1,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
  },
  container: {
    marginBottom: 35,
    backgroundColor: "#2a2a2a",
    position: 'relative',
    zIndex: 0,
  },
  profile: {
    flex:0,
    top: 0,
    right: 0,
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: "#2a2a2a",
    zIndex: 2,
  },

  settingIcon: {
    width: 30,  
    height: 30, 
  }
});