import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        console.log('User logged in successfully');
        setLoading(false)
        navigation.replace("main");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setLoading(false)
        console.error('Login error:', errorMessage);
        Alert.alert('Login Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/diafit.png")} />
      <Text style={styles.title}>DiaFit</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      {loading ? <ActivityIndicator size="small" color='#177AD5' /> :
        <>
          <Button mode="contained" color='#177AD5' onPress={handleLogin} style={styles.button}>
            Login
          </Button>
          <TouchableOpacity onPress={() => navigation.replace("signup")}>
            <Text style={styles.noAcc}>Create Account</Text>
          </TouchableOpacity>
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noAcc: {
    fontSize: 16,
    fontWeight: '300',
    marginTop: 20,
  },
});

export default LoginScreen;
