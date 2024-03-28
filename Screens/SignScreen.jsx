import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore'; // Import Firestore modules
import RNPickerSelect from 'react-native-picker-select';
import { firebaseAuth, firestore } from '../firebaseConfig'; // Assuming you have already initialized Firestore

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const placeholder = {
    label: 'Select user type...',
    value: null,
  };

  const options = [
    { label: 'Patient', value: 'Patient' },
    { label: 'Doctor', value: 'Doctor' },
  ];

  const handleSignUp = () => {
    setLoading(true);
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update user profile with display name
        updateProfile(user, {
          displayName: username,
        }).then(() => {
          console.log('User profile updated with display name:', username);
          signInWithEmailAndPassword(firebseAuth, email, password)
            .then(() => {
              console.log("Logged in. ")
              navigation.replace("records");
              setLoading(false);
            })
        }).catch((error) => {
          console.error('Error updating user profile:', error.message);
          setLoading(false);

        });

        // // Store user type in Firestore
        // const userDocRef = doc(firestore, 'userTypes', user.uid); // Assuming 'userTypes' is the collection name
        // setDoc(userDocRef, {
        //   userType: selectedValue,
        // }).then(() => {
        //   console.log('User type stored in Firestore:', selectedValue);
        //   setLoading(false);

        // }).catch((error) => {
        //   console.error('Error storing user type in Firestore:', error.message);
        //   setLoading(false);

        // });
      })
      .catch((error) => {
        // Handle sign-up errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-up error:', errorMessage);
        setLoading(false);

        // Handle specific errors or display error message to the user
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <Image source={require("../assets/diafit.png")} />
      <Text style={styles.title}>DiaFit</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        style={styles.input}
      />
      {/* <View style={{ width: "100%" }}>
        <RNPickerSelect
          placeholder={placeholder}
          items={options}
          onValueChange={(value) => setSelectedValue(value)}
          value={selectedValue}
        />
        {selectedValue && <Text>Selected: {selectedValue}</Text>}
      </View> */}
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
          <Button mode="contained" buttonColor='#177AD5' onPress={handleSignUp} style={styles.button}>
            Sign Up
          </Button>
          <TouchableOpacity onPress={() => navigation.replace("login")}>
            <Text style={styles.noAcc}>Already Having an Account</Text>
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

export default SignUpScreen;
