import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const Demandes = ({ navigation }) => {
  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
        <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.title}>Héberg'Innov</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={handleSettingsPress}>
        <Ionicons name="settings-outline" size={24} color="black" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Demandes;
