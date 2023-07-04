import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NotificationPage from './Notification';

const HomePage = ({ navigation }) => {
  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.iconContainer}>
          <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
        </View>
        <Text style={styles.title}>App SDF</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      {/* Le reste du contenu de votre page d'accueil */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1EC',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 16,
  },
});

export default HomePage;
