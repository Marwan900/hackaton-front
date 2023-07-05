import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Logique pour la déconnexion du compte
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Ionicons name="language-outline" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Langue</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Ionicons name="person-outline" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Information du compte</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Ionicons name="walk-outline" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Accessibilité</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Confidentialité</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => {}}>
        <Ionicons name="document-outline" size={24} color="black" style={styles.optionIcon} />
        <Text style={styles.optionText}>Espace du compte</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1EC',
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 65,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#4287f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SettingsScreen;
