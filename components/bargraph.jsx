import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarChart } from "react-native-gifted-charts";

export default function Bargraph() {
    const [user, setUser] = useState(null);

    const data = [
        { value: 39, label: 'Gl' },
        { value: 52, label: 'Cal' },
        { value: 0.3, label: 'Prot' },
        { value: 14, label: 'CHO' },
        { value: 0.2, label: 'F' },
        { value: 8.5, label: 'Other' }
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
                    xAxisLabels={['Gl', 'Cal', 'Prot', 'CHO', 'F', 'Other']}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    chartContainer: {
        flex: 1,
    },
});
