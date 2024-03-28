import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, Text } from "react-native-paper";
import { doc, onSnapshot } from 'firebase/firestore';
import { firestoredb } from '../firebaseConfig'; // Import your Firebase Firestore configuration
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Bargraph from "../components/bargraph";
import MedicalReminder from "../components/medicationReminder";

export default function DashBoard() {
    const [weight, setWeight] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");
    const [millimoter, setMillimoter] = useState("");
    const [glycated, setGlycated] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const docRef = doc(firestoredb, 'userHealthRecords', user.uid);
                const unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        setWeight(data.weight || "");
                        setBloodPressure(data.bloodPressure || "");
                        setMillimoter(data.mgdcl || "");
                        setGlycated(data.glycatedHemoglobin || "");
                    } else {
                        console.log("No such document!");
                    }
                });
                return () => unsubscribeSnapshot();
            }
        });

        return () => unsubscribeAuth();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Health Metrics</Text>
            <View style={styles.cardContainer}>
                <Card style={[styles.card, { backgroundColor: "#155e75" }]}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardText}>Weight</Text>
                        <Text style={styles.cardText}>{weight}</Text>
                    </View>
                </Card>
                <Card style={[styles.card, { backgroundColor: "#3730a3" }]}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardText}>Blood Pressure</Text>
                        <Text style={styles.cardText}>{bloodPressure} mm/Hg</Text>
                    </View>
                </Card>
                <Card style={[styles.card, { backgroundColor: "#083344" }]}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardText}>Millimoter per Liter</Text>
                        <Text style={styles.cardText}>{millimoter}  mmol/L</Text>
                    </View>
                </Card>
                <Card style={[styles.card, { backgroundColor: "#2563eb" }]}>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardText}>Glycated Hemoglobin</Text>
                        <Text style={styles.cardText}>{glycated} %</Text>
                    </View>
                </Card>
            </View>
            <View>
                <Text style={styles.title}>Nutrition Summary</Text>
                <Bargraph/>
            </View>
            <View>
                <Text style={styles.title}>Medication Schedule</Text>
                <MedicalReminder/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    cardContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: "48%",
        marginBottom: 20,
    },
    cardContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    cardText: {
        color: "#fff",
        marginBottom: 5,
        fontWeight: "400",
        fontSize: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});