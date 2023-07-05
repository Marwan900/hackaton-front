import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
  const [message, setMessage] = React.useState("");
  const [isBubbleVisible, setIsBubbleVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("Médical");
  const [location, setLocation] = React.useState("");

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
    if (message.trim() !== "" && location.trim() !== "") {
      const newMessage = {
        type: selectedType,
        message: message,
        location: location
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      setLocation("");
      setIsBubbleVisible(false);
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
        <Text style={styles.title}>Héberg'Innov</Text>
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
          />
          <TouchableOpacity style={styles.addIconContainer} onPress={handleAddMessage}>
            <Ionicons name="add-outline" size={24} color="black" style={styles.addIcon} />
          </TouchableOpacity>
        </View>
        {isBubbleVisible && (
          <View style={styles.messageBubble}>
            <Text style={styles.modalTitle}>Nouveau message</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedType}
              onValueChange={(itemValue) => setSelectedType(itemValue)}
            >
              <Picker.Item label="Médical" value="Médical" />
              <Picker.Item label="Alimentaire" value="Alimentaire" />
              <Picker.Item label="Hébergement" value="Hébergement" />
            </Picker>
            <TextInput
              style={styles.modalInput}
              placeholder="Message"
              value={message}
              onChangeText={setMessage}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Localisation"
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleSendMessage}>
              <Text style={styles.modalButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        )}
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text style={styles.messageType}>{msg.type}</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageLocation}>{msg.location}</Text>
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
    height: 100,
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
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
  },
  modalInput: {
    height: 36,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonText: {
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
  messageType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 8,
  },
  messageLocation: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
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
