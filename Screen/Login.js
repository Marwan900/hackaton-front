import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pwd: password }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        if (data === false) {
          setErrorMessage('Email or password is incorrect.');
        } else {
          await AsyncStorage.setItem('accessToken', data.accessToken); // Store access token in local storage
          await AsyncStorage.setItem('currentUser', JSON.stringify(data.currentUser)); // Store current user in local storage

          // Redirect to the home page or perform any other necessary actions
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main', params: { screen: 'HomePage' } }],
          });
        }
      } else {
        setErrorMessage('Connexion impossible.');
        console.error(data.error);
      }
    } catch (error) {
      setErrorMessage('Connexion impossible.');
      console.error(error);
    }
  };
  

  const handleSignUp = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_heberginnov.png')} style={styles.logo} resizeMode="contain"  />
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
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{errorMessage && <Text>{errorMessage}</Text>}</Text>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Créer un nouveau compte</Text>
      </TouchableOpacity>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Estiam © 2023</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
    backgroundColor: '#0d7377',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#0d7377',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#0d7377',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 50,
  },
  footerText: {
    color: 'grey',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
