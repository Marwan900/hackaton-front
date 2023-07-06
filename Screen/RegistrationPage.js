import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const RegistrationPage = ({ navigation }) => {
  const [lastname, setNom] = useState('');
  const [firstname, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setMotDePasse] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading

  const handleRegistration = async () => {
    const user = {
      lastname,
      firstname,
      email,
      pwd,
      type,
    };

    setIsLoading(true); // Set loading to true

    try {
      const response = await fetch('http://10.0.2.2:3000/users/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
      console.log(data); // Log the response data to check its content
  
      if (response.ok) {
        // Registration successful
        if (data === false) {
          // Email is already duplicated
          alert('Ce mail est déjà utilisé.');
        } else {
          navigation.navigate('Login');
          // Rest of the code...
        }
      } else {
        console.error(data.error);
          
      }
    } catch (error) {
      // Handle error or show appropriate message
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={lastname}
        onChangeText={setNom}
      />
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={firstname}
        onChangeText={setPrenom}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={pwd}
        onChangeText={setMotDePasse}
      />
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Vous êtes:</Text>
        <View style={styles.radioButton}>
          <TouchableOpacity
            style={[
              styles.radioOption,
              type === 'benevole' && styles.radioOptionSelected,
            ]}
            onPress={() => setType('benevole')}
          >
            <Text
              style={[
                styles.radioOptionText,
                type === 'benevole' && styles.radioOptionTextSelected,
              ]}
            >
              Bénévole
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioOption,
              type === 'sansAbri' && styles.radioOptionSelected,
            ]}
            onPress={() => setType('sansAbri')}
          >
            <Text
              style={[
                styles.radioOptionText,
                type === 'sansAbri' && styles.radioOptionTextSelected,
              ]}
            >
              Sans abri
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        {isLoading ? ( // Show loading indicator if isLoading is true
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>S'inscrire</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  radioButton: {
    flexDirection: 'row',
  },
  radioOption: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  radioOptionSelected: {
    backgroundColor: '#0d7377',
    borderColor: '#0d7377',
  },
  radioOptionText: {
    fontSize: 16,
    color: '#0d7377',
  },
  radioOptionTextSelected: {
    color: '#FFFFFF',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0d7377',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationPage;