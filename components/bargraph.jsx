import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore'; // Added onSnapshot
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { firestoredb } from '../firebaseConfig';

export default function Bargraph() {
    const [user, setUser] = useState(null);
    const [userDiet, setUserDiet] = useState({});

    console.log("Calcium: ", userDiet.calcium);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const dietRef = doc(firestoredb, 'userDiet', user.uid);
                const dietSnapshot = onSnapshot(dietRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data();
                        console.log("Data Loading: ", data);
                        setUserDiet(data);
                    } else {
                        console.log("No such document!");
                    }
                });
                // Return the unsubscribe function
                return () => dietSnapshot();
            }
        });

        return () => unsubscribeAuth();
    }, []);

    // Convert userDiet object to data array for BarChart
    const data = [
        { value: userDiet.glycemic_Index || 0, label: 'Gl' },
        { value: userDiet.calcium || 0, label: 'Cal' },
        { value: userDiet.protein || 0, label: 'Prot' },
        { value: userDiet.carbohydrates || 0, label: 'CHO' },
        { value: userDiet.fat || 0, label: 'F' },
        // Add more properties if needed
    ];

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <BarChart
                    data={data}
                    barColor="#1e293b"
                    frontColor='#177AD5'
                    barSpacing={18}
                    barStyle={{ borderRadius: 8 }}
                    yAxisLabel=""
                    xAxisLabels={['Gl', 'Cal', 'Prot', 'CHO', 'F']}
                    showGridLines
                    gridLinesColor="#1e3a8a"
                    gridLinesWidth={1}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    chartContainer: {
        flex: 1,
    },
});
