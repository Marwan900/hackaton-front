import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
  const [message, setMessage] = React.useState("");
  const [isBubbleVisible, setIsBubbleVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleAddMessage = () => {
    setIsBubbleVisible(true);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage(""); // Réinitialiser le champ de saisie du message
      setIsBubbleVisible(false); // Masquer la bulle textuelle
    }
  };

  const handleDeleteMessage = (index) => {
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
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
      </View>
      <View style={styles.content}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            // Ajoutez ici les fonctions de gestion de la recherche
          />
          <TouchableOpacity style={styles.addIconContainer} onPress={handleAddMessage}>
            <Ionicons name="add-outline" size={24} color="black" style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        {/* Le reste du contenu de votre page d'accueil */}
        {isBubbleVisible && (
          <View style={styles.messageBubble}>
            <TextInput
              style={styles.messageInput}
              placeholder="Entrez votre message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        )}
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.messageText}>{msg}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteMessage(index)}
            >
              <Ionicons name="close-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
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
  addIconContainer: {
    marginLeft: 8,
  },
  addIcon: {
    fontSize: 24,
    color: 'black',
  },
  messageBubble: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    position: 'relative',
  },
  messageText: {
    fontSize: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
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
