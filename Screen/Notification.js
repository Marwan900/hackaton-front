import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationPage = () => {
  const notifications = [
    { type: 'chat', message: 'Nouveau message de John' },
    { type: 'post', message: 'Nouvelle publication de Jane à proximité' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Notifications</Text>
      {notifications.map((notification, index) => (
        <View key={index} style={styles.notificationContainer}>
          {notification.type === 'chat' ? (
            <Text style={styles.chatNotification}>{notification.message}</Text>
          ) : (
            <Text style={styles.postNotification}>{notification.message}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1EC',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: '80%',
  },
  chatNotification: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postNotification: {
    fontSize: 18,
  },
});

export default NotificationPage;
