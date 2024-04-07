import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import { Card, Text, TextInput, Button } from "react-native-paper";
import customstyles from "../values/styles";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestoredb } from "../firebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function RecommendationScreen() {
    const [glucose, setGlucose] = useState("");
    const [user, setUser] = useState(null);
    const [recommendedFoods, setRecommendedFoods] = useState([]);
    const [data, setData] = useState([]);

    console.log("Value: ", glucose);
    console.log("Data: ", data);
    console.log("recommended Foods: ", recommendedFoods);


    const foodchoice = async (foodname, Glycemic_Index, Calcium_Content, Fat, Carbohydrates, Protein) => {
        console.log("Clicked!");
        await setDoc(doc(firestoredb, "userDiet", user.uid), {
            user: user.uid,
            foodname: foodname,
            glycemic_Index:Glycemic_Index,
            calcium: Calcium_Content,
            fat:Fat,
            carbohydrates: Carbohydrates,
            protein:Protein
        }).then(() =>{
            console.log("Item added!")
        })
    }
    useEffect(() => {
        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setUser(user);
        });

        if (glucose !== "") {
            let recommended = [];
            const glucoseValue = parseFloat(glucose);

            if (glucoseValue >= 10) {
                // Recommend foods with glycemic index of 0-55
                recommended = data.filter(item => parseInt(item.Glycemic_Index) <= 55);
            } else if (glucoseValue >= 3.9 && glucoseValue < 10) {
                // Recommend foods with glycemic index of 55-69
                recommended = data.filter(item => parseInt(item.Glycemic_Index) > 55 && parseInt(item.Glycemic_Index) <= 69);
            } else if (glucoseValue < 3.9) {
                // Recommend foods with glycemic index above 70
                recommended = data.filter(item => parseInt(item.Glycemic_Index) > 70);
            }

            setRecommendedFoods(recommended);
        }
        return () => unsubscribeAuth();
    }, [glucose]);

    useEffect(() => {
        const fetchData = async () => {
            const dbRef = collection(firestoredb, 'recommendedFood');
            const dataSnapshot = await getDocs(dbRef);
            const recommendedData = [];
            dataSnapshot.forEach((doc) => {
                recommendedData.push(doc.data());
            });
            setData(recommendedData);
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <TextInput
                mode="outlined"
                placeholder="Enter Glucose Level"
                label="Glucose Level"
                onChangeText={text => setGlucose(text)}
                value={glucose}
                style={styles.textInput}
                keyboardType="numeric"
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={[customstyles.grid, customstyles.space_between, customstyles.wrap]}>
                    {recommendedFoods.map((item, index) => (
                        <Card key={index} style={styles.card}>
                            <Card.Cover source={{ uri: item.imageUri }} />
                            <Card.Content style={styles.cardContent}>
                                <Text style={styles.title}>{item.foodName}</Text>
                                <Text style={styles.valueText}>{item.Glycemic_Index} Glycemic Index</Text>
                            </Card.Content>
                            <Card.Actions style={styles.cardContent}>
                                <TouchableOpacity onPress={() => foodchoice(item.foodName, item.Glycemic_Index, item.Calcium_Content, item.Fat, item.Carbohydrates, item.Protein)}>
                                    <Button mode="contained" buttonColor='#177AD5'>SELECT</Button>
                                </TouchableOpacity>
                            </Card.Actions>
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flexGrow: 1,
    },
    textInput: {
        marginVertical: 10,
        marginHorizontal: 10,
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
    title: {
        fontSize: 16,
        fontWeight: '500',
    },
    valueText: {
        fontSize: 14,
        fontWeight: '300',
        color: 'gray',
    },
});
