import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnnouncesPage = ({ navigation }) => {
  const [message, setMessage] = React.useState("");
  const [isBubbleVisible, setIsBubbleVisible] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [selectedType, setSelectedType] = React.useState("Médical");
  const [location, setLocation] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedMessageIndex, setEditedMessageIndex] = React.useState(null);
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const handleAddMessage = () => {
    setIsBubbleVisible(true);
  };

  const readCurrentUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser !== null) {
        const parsedUser = JSON.parse(currentUser);
        setUserType(parsedUser.type);
        setUserName(parsedUser.firstname +" "+parsedUser.lastname);
        setUserId(parsedUser._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMessage = async () => {
    readCurrentUser();
    if (message.trim() !== "" && location.trim() !== "") {
      if (isEditing) {
        const updatedMessages = [...messages];
        const editedMessage = {
          type: selectedType,
          title: message,
          place: location
        };
        updatedMessages[editedMessageIndex] = editedMessage;
        setMessages(updatedMessages);
        setIsEditing(false);
        setEditedMessageIndex(null);
      } else {
        const newMessage = {
          userId: userId,
          userName:userName,
          userType:userType,
          type: selectedType,
          title: message,
          place: location
        };
        try {
          const response = await fetch('http://10.0.2.2:3000/announces/addAnnounce', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
          });
          const data = await response.json();
          console.log(data); // Log the response data to check its content
          if (response.ok) {
            // successful
            setMessages([...messages, newMessage]);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          // Handle error or show appropriate message
          console.error(error);
        }
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


  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
        <Image source={require('../assets/logo_heberginnov.png')} style={styles.logo} resizeMode="contain"  />
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
            <Text style={styles.modalTitle}>{isEditing ? 'Modifier une annonce' : 'Nouvelle annonce'}</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedType}
              onValueChange={(itemValue) => setSelectedType(itemValue)}
            >
              <Picker.Item label="Médical" value="Médical" />
              <Picker.Item label="Alimentaire" value="Alimentaire" />
              <Picker.Item label="Hébergement" value="Hébergement" />
              <Picker.Item label="Vétements" value="Vétements" />
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
              <Text style={styles.messageText}>{message.title}</Text>
              <Text style={styles.messageLocation}>{message.place}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 100,
    marginBottom: 5,
  },
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

export default AnnouncesPage;