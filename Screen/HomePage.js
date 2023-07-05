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
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedMessageIndex, setEditedMessageIndex] = React.useState(null);

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
      if (isEditing) {
        const updatedMessages = [...messages];
        const editedMessage = {
          type: selectedType,
          message: message,
          location: location
        };
        updatedMessages[editedMessageIndex] = editedMessage;
        setMessages(updatedMessages);
        setIsEditing(false);
        setEditedMessageIndex(null);
      } else {
        const newMessage = {
          type: selectedType,
          message: message,
          location: location
        };
        setMessages([...messages, newMessage]);
      }
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

  const handleEditMessage = (index) => {
    const editedMessage = messages[index];
    setSelectedType(editedMessage.type);
    setMessage(editedMessage.message);
    setLocation(editedMessage.location);
    setIsBubbleVisible(true);
    setIsEditing(true);
    setEditedMessageIndex(index);
  };

  const handleCancel = () => {
    setIsBubbleVisible(false);
    setIsEditing(false);
    setEditedMessageIndex(null);
    setMessage("");
    setLocation("");
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
            <Text style={styles.modalTitle}>{isEditing ? 'Modifier le message' : 'Nouveau message'}</Text>
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Text style={styles.sendButtonText}>{isEditing ? 'Modifier' : 'Envoyer'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
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
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditMessage(index)}
              >
                <Ionicons name="pencil-outline" size={20} color="black" style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="search-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleFoodPress}>
          <Ionicons name="fast-food-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Annonces</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleHomePress}>
          <Ionicons name="home-outline" size={24} color="black" style={styles.footerIcon} />
          <Text style={styles.footerText}>Demmandes</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
  },
  addIconContainer: {
    marginLeft: 8,
    padding: 8,
  },
  addIcon: {
    marginRight: 8,
  },
  messageBubble: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ff0000',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  messageType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    marginBottom: 4,
  },
  messageLocation: {
    marginBottom: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  editButton: {
    position: 'absolute',
    top: 8,
    right: 40,
  },
  deleteIcon: {
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
  footerButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerIcon: {
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
  },
});

export default HomePage;
