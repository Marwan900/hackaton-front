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

  const handleMedicalPress = () => {
    // Ajoutez le code de navigation vers la page Médical
  };

  const handleFoodPress = () => {
    // Ajoutez le code de navigation vers la page Alimentaire
  };

  const handleHomePress = () => {
    // Ajoutez le code de navigation vers la page Maison
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
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.messageList}>
          {messages.map((message, index) => (
            <View style={styles.messageContainer} key={index}>
              <Text style={styles.messageType}>{message.type}</Text>
              <Text style={styles.messageText}>{message.message}</Text>
              <Text style={styles.messageLocation}>{message.location}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteMessage(index)}
              >
                <Ionicons name="trash-outline" size={20} color="black" style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleMedicalPress}>
          <Ionicons name="medkit-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Médical</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleFoodPress}>
          <Ionicons name="fast-food-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Manger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleHomePress}>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  addIconContainer: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },
  addIcon: {
    fontSize: 24,
  },
  messageBubble: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
  },
  modalInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  sendButton: {
    backgroundColor: 'lightgray',
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  messageType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messageText: {
    marginBottom: 8,
  },
  messageLocation: {
    fontStyle: 'italic',
    marginBottom: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  deleteIcon: {
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
  },
});

export default HomePage;
