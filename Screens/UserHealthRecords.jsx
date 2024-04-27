import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, ActivityIndicator } from 'react-native-paper';
import { setDoc, doc } from 'firebase/firestore';
import { firestoredb } from '../firebaseConfig'; // Import Firebase Auth module and Firestore
import { StatusBar } from 'expo-status-bar';

export default function UserHealthRecords({ navigation }) {
    const [selectedValue, setSelectedValue] = useState(null);
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [hemoglobin, setHemoglobin] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const placeholder = {
        label: 'Select Diabetic type...',
        value: null,
    };

    const handleSave = async () => {
        setLoading(true)
        try {
            if (user) {
                const data = {
                    age: parseInt(age),
                    weight: parseInt(weight),
                    glycatedHemoglobin: parseInt(hemoglobin),
                    bloodPressure,
                };

                const docRef = doc(firestoredb, 'userHealthRecords', user.uid);
                await setDoc(docRef, data);

                console.log('Document written with ID: ', docRef.id);
                setLoading(false);
                Alert.alert('Success', 'Health records saved successfully.');
                navigation.navigate("main");
            } else {
                setLoading(false);
                Alert.alert('Error', 'User not authenticated.');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error adding document: ', error);
            Alert.alert('Error', 'Failed to save health records. Please try again.');
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar style='dark' />
            <TextInput
                label="Age (Years)"
                keyboardType="numeric"
                mode="outlined"
                value={age}
                onChangeText={setAge}
                style={styles.input}
            />

            <TextInput
                label="Weight"
                keyboardType="numeric"
                mode="outlined"
                value={weight}
                onChangeText={setWeight}
                style={styles.input}
            />

            <TextInput
                label="Glycated Hemoglobin"
                keyboardType="numeric"
                mode="outlined"
                value={hemoglobin}
                onChangeText={setHemoglobin}
                style={styles.input}
            />

            <TextInput
                label="Blood Pressure"
                keyboardType="default"
                mode="outlined"
                value={bloodPressure}
                onChangeText={setBloodPressure}
                style={styles.input}
            />
            {loading ?
                <ActivityIndicator color='#177AD5' size="small" />
                :
                <Button mode="contained" buttonColor='#177AD5' onPress={handleSave} style={styles.button}>
                    Save
                </Button>
            }

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginVertical: 5,
    }
});
