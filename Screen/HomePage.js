import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ navigation }) => {
  const [announces, setAnnounces] = useState([]);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state

  const readCurrentUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser !== null) {
        const parsedUser = JSON.parse(currentUser);
        setUserType(parsedUser.type === "benevole" ? "sansAbri" : "benevole");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readCurrentUser();
  }, []);
  
  useEffect(() => {
    if (userType !== "") {
      fetchAnnounces(userType);
    }
  }, [userType]);

  const fetchAnnounces = async (userType) => {
    try {
      const url = `http://10.0.2.2:3000/announces/getAnnounces?userType=${userType}`;
      const response = await fetch(url);
      const data = await response.json();
      setAnnounces(data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false on error as well
    }
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('../assets/logo_heberginnov.png')} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity style={styles.iconContainer} onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
        />
      </View>
      <ScrollView style={styles.scrollContainer}>
        {announces.map((announce, index) => (
          <View style={styles.announceContainer} key={index}>
            <View style={styles.announceDetailsContainer}>
              <Image source={require(`../assets/2.png`)} style={styles.announceImage} />
              <View style={styles.announceTextContainer}>
                <Text style={styles.announceTitle}>{announce.title}</Text>
                <Text style={styles.announceDetails}>Commentaire: {announce.comment}</Text>
                <Text style={styles.announceDetails}>Nom: {announce.userName}</Text>
                <Text style={styles.announceDetails}>Type: {announce.type}</Text>
                <Text style={styles.announceDetails}>Location: {announce.place}</Text>
                <Text style={styles.announceDetails}>Date: {formatDate(announce.date)}</Text>
              </View>
            </View>
            <View style={styles.buttonContainerContainer}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Ionicons name="heart" size={24} color="red" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{userType === 'benevole' ? "Demander de l'aide" : "Aider"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 5,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  announceContainer: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    elevation: 2,
  },
  announceDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  announceImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  announceTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  announceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  announceDetails: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666666',
  },
  buttonContainerContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingVertical: 8,
    margin: 16,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
});

export default HomePage;
