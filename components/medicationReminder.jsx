import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function MedicalReminder() {
    const [selectedDates, setSelectedDates] = useState({});

    const handleDateSelect = (date) => {
        const updatedDates = { ...selectedDates };
        if (updatedDates[date]) {
            // If date is already selected, unselect it
            delete updatedDates[date];
        } else {
            // If date is not selected, add it to the selected dates
            updatedDates[date] = { selected: true, marked: true };
        }
        setSelectedDates(updatedDates);
    };

    // Convert current date to ISO string format
    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <View>
            <Calendar
                current={currentDate} // Pass the string representation of the current date
                markedDates={selectedDates}
                onDayPress={(day) => handleDateSelect(day.dateString)}
            />
        </View>
    );
}
