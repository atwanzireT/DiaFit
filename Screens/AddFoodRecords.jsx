import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export default function AddFoodRecord() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Record Food Item</Text>
            <TextInput label="Glycemic Index" style={styles.input} />
            <TextInput label="Calories" style={styles.input} />
            <TextInput label="Carbohydrates" style={styles.input} />
            <TextInput label="Protein" style={styles.input} />
            <TextInput label="Fat" style={styles.input} />
            <TextInput label="Sodium Content" style={styles.input} />
            <TextInput label="Potassium Content" style={styles.input} />
            <TextInput label="Magnesium Content" style={styles.input} />
            <TextInput label="Calcium Content" style={styles.input} />
            <TextInput label="Fiber Content" style={styles.input} />
        </View>
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
