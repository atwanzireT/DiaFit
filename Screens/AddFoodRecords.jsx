import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import { addDoc, collection } from 'firebase/firestore';
import { firestoredb } from '../firebaseConfig';

export default function AddFoodRecord() {
    const [foodName, setFoodName] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [formData, setFormData] = useState({
        Glycemic_Index: null,
        Calories: '',
        Carbohydrates: '',
        Protein: '',
        Fat: '',
        Sodium_Content: '',
        Potassium_Content: '',
        Magnesium_Content: '',
        Calcium_Content: '',
        Fiber_Content: '',
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://5183-41-75-190-7.ngrok-free.app/predict/', formData);
            if (response.data.prediction == 1) {
                Alert.alert('Classification', `The ${foodName} is good for a diabetic patient.`);
                // Add the food record to Firestore
                let foodRecord = {
                    foodName: foodName,
                    imageUri: imageUri,
                    Glycemic_Index: parseInt(formData.Glycemic_Index),
                    Calories: formData.Calories,
                    Carbohydrates: formData.Carbohydrates,
                    Protein: formData.Protein,
                    Fat: formData.Fat,
                    Sodium_Content: formData.Sodium_Content,
                    Potassium_Content: formData.Potassium_Content,
                    Magnesium_Content: formData.Magnesium_Content,
                    Calcium_Content: formData.Calcium_Content,
                    Fiber_Content: formData.Fiber_Content,
                };
                await addDoc(collection(firestoredb, 'recommendedFood'), foodRecord);
            } else {
                Alert.alert('Classification', `${foodName} is not recommended for a diabetic patient.`);
            }
        } catch (error) {
            Alert.alert('Error', `Failed to make prediction. Please try again. ${error}`);
        }
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginBottom: 30 }}>
                <Text style={styles.title}>Record Food Item</Text>
                <TextInput label="Food Name" style={styles.input} value={foodName} onChangeText={(text) => setFoodName(text)} />
                <TextInput label="Image Uri" style={styles.input} value={imageUri} onChangeText={(text) => setImageUri(text)} />
                <TextInput label="Glycemic Index" keyboardType='numeric' style={styles.input} value={formData.Glycemic_Index} onChangeText={(text) => handleInputChange('Glycemic_Index', text)} />
                <TextInput label="Calories" style={styles.input} value={formData.Calories} onChangeText={(text) => handleInputChange('Calories', text)} />
                <TextInput label="Carbohydrates" style={styles.input} value={formData.Carbohydrates} onChangeText={(text) => handleInputChange('Carbohydrates', text)} />
                <TextInput label="Protein" style={styles.input} value={formData.Protein} onChangeText={(text) => handleInputChange('Protein', text)} />
                <TextInput label="Fat" style={styles.input} value={formData.Fat} onChangeText={(text) => handleInputChange('Fat', text)} />
                <TextInput label="Sodium Content" style={styles.input} value={formData.Sodium_Content} onChangeText={(text) => handleInputChange('Sodium_Content', text)} />
                <TextInput label="Potassium Content" style={styles.input} value={formData.Potassium_Content} onChangeText={(text) => handleInputChange('Potassium_Content', text)} />
                <TextInput label="Magnesium Content" style={styles.input} value={formData.Magnesium_Content} onChangeText={(text) => handleInputChange('Magnesium_Content', text)} />
                <TextInput label="Calcium Content" style={styles.input} value={formData.Calcium_Content} onChangeText={(text) => handleInputChange('Calcium_Content', text)} />
                <TextInput label="Fiber Content" style={styles.input} value={formData.Fiber_Content} onChangeText={(text) => handleInputChange('Fiber_Content', text)} />
                <Button title="Predict" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
