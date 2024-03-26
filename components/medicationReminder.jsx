import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function MedicalReminder() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <View>
            <Calendar
                current={selectedDate}
                onDayPress={(day) => handleDateChange(day.dateString)}
            />
        </View>
    );
}
