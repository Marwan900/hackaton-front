import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.iconContainer}>
          <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
        </View>
        <Text style={styles.title}>App SDF</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
        </View>
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
    paddingHorizontal: 140,
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
