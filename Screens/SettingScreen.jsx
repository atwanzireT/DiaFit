import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import customstyles from "../values/styles";

export default function SettingScreen({navigation}) {

    const handleLogout = async () => {
        try {
            await signOut(); // Call the signOut function from firebaseConfig
            // Navigate to login screen or any other screen you prefer
            navigation.navigate('Login'); // Change 'Login' to your desired screen name
        } catch (error) {
            console.error("Error logging out: ", error);
            Alert.alert("Error", "An error occurred while logging out. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: "https://i.pinimg.com/564x/12/95/5d/12955dd2c20ee567d155b75487aa7bbf.jpg" }}
                    style={styles.image}
                />
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.username}>Fedora</Text>
                <Text style={styles.userType}>Type 2</Text>
            </View>
            <View>
                <Card onPress={()=>{navigation.navigate("records")}} style={[customstyles.mh_10, customstyles.mt_5]}>
                    <View style={[customstyles.p_20, customstyles.grid, customstyles.space_between]}>
                        <Text>Edit Health Records</Text>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                </Card>
                <Card onPress={handleLogout} style={[customstyles.mh_10, customstyles.mt_5]}>
                    <View style={[customstyles.p_20, customstyles.grid, customstyles.space_between]}>
                        <Text>Logout</Text>
                        <FontAwesome5 name="power-off" size={24} color="#991b1b" />
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        alignItems: 'center',

    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userType: {
        fontSize: 16,
    },
});
