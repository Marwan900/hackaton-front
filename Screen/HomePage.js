import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>App SDF</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
<<<<<<< HEAD
=======
        <Text style={styles.title}>App SDF</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="settings-outline" size={30} color="black" style={styles.icon} />
          <Ionicons name="notifications-outline" size={30} color="black" style={styles.icon} />
        </View>
>>>>>>> b9449063cce42872b524f8e103c3c5e84fb58845
      </View>
      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            // Ajoutez ici les fonctions de gestion de la recherche
          />
        </View>
        {/* Le reste du contenu de votre page d'accueil */}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="medkit-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Médical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="fast-food-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Manger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Maison</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
    height: 100, // Hauteur de la navbar
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  iconContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'black',
    marginLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 24,
    color: 'black',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'black',
    paddingVertical: 16,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 24,
    color: 'black',
  },
  footerText: {
    marginTop: 8,
    fontSize: 12,
    color: 'black',
  },
});

export default HomePage;
