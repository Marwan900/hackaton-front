import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const NotificationPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.notification}>Notification 1</Text>
      <Text style={styles.notification}>Notification 2</Text>
      <Text style={styles.notification}>Notification 3</Text>
      {/* Ajoutez ici le contenu de vos notifications */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notification: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default NotificationPage;
