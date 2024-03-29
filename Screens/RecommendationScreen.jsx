import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import customstyles from "../values/styles";

export default function RecommendationScreen() {
    const data = [
        { food: 'Bananas', glycemicIndex: 57, imageUri: 'https://i.pinimg.com/564x/bb/e0/e3/bbe0e3e2e43f86c3564d4b7322cdc537.jpg' },
        { food: 'Apples', glycemicIndex: 39, imageUri: 'https://i.pinimg.com/564x/1e/fe/06/1efe0654537adf9efa4bbdcec5eb433c.jpg' },
        { food: 'Strawberries	', glycemicIndex: 40, imageUri: 'https://i.pinimg.com/564x/93/76/49/93764936c19051e832b5218a08a08199.jpg' },
        { food: 'Eggplant', glycemicIndex: 15, imageUri: 'https://i.pinimg.com/564x/38/bd/2f/38bd2f5b5fc98f403fc32819fe71f0cf.jpg' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <TextInput
                mode="outlined"
                placeholder="Enter Glycemic Index"
                label="Glycemic Index"
                style={styles.textInput} />
            <View style={[customstyles.grid, customstyles.space_between, customstyles.wrap]}>
                {data.map((item, index) => (
                    <Card key={index} style={styles.card}>
                        <Card.Cover source={{ uri: item.imageUri }} />
                        <Card.Content style={styles.cardContent}>
                            <View style={styles.cardContent}>
                                <View>
                                    <Text style={styles.valueText}>{item.food}</Text>
                                    <Text style={styles.title}>{item.glycemicIndex} Glycemic Index</Text>
                                </View>
                            </View>
                        </Card.Content>
                        <Card.Actions style={styles.cardContent}>
                            <Button mode="contained" color='#177AD5'>SELECT</Button>
                        </Card.Actions>
                    </Card>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textInput: {
        marginVertical: 10,
        marginHorizontal:3,
    },
    card: {
        width: "48%",
        marginVertical: 5,
        marginHorizontal: 3,
    },
    cardContent: {
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    cardgrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    valueText: {
        fontSize: 16,
        fontWeight: '300',
    },
    flatListContent: {
        paddingVertical: 20,
    },
});
