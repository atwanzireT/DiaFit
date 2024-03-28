import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { firebaseAuth, firestoredb } from '../firebaseConfig'; // Import Firebase Auth module and Firestore
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';

export default function UserHealthRecords({ navigation }) {
    const [selectedValue, setSelectedValue] = useState(null);
    const [age, setAge] = useState('');
    const [mgdcl, setMgdcl] = useState('');
    const [weight, setWeight] = useState('');
    const [hemoglobin, setHemoglobin] = useState('');
    const [bloodPressure, setBloodPressure] = useState('');
    const [user, setUser] = useState(null);

    const placeholder = {
        label: 'Select Diabetic type...',
        value: null,
    };

    const options = [
        { label: 'type1', value: 'Type 1' },
        { label: 'type2', value: 'Type 2' },
    ];

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSave = async () => {
        try {
            if (user) {
                const data = {
                    age: parseInt(age),
                    mgdcl: parseInt(mgdcl),
                    weight: parseInt(weight),
                    glycatedHemoglobin: parseInt(hemoglobin),
                    bloodPressure,
                    diabeticType: selectedValue,
                };

                const docRef = doc(firestoredb, 'userHealthRecords', user.uid);
                await setDoc(docRef, data);

                console.log('Document written with ID: ', docRef.id);
                Alert.alert('Success', 'Health records saved successfully.');
                navigation.navigate("main");
            } else {
                Alert.alert('Error', 'User not authenticated.');
            }
        } catch (error) {
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
                label="MMO/L (Millimoles per Liter)"
                keyboardType="numeric"
                mode="outlined"
                value={mgdcl}
                onChangeText={setMgdcl}
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

            <View style={{ width: "100%", backgroundColor: "#fff" }}>
                <RNPickerSelect
                    placeholder={placeholder}
                    items={options}
                    onValueChange={(value) => setSelectedValue(value)}
                    value={selectedValue}
                />
            </View>
            <Button mode="contained" buttonColor='#177AD5' onPress={handleSave} style={styles.button}>
                Save
            </Button>
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
