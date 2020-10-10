import React, { useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';

import { View, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';

export default function SplashScreen(props) {
    const [isLogged, changeUserStatus] = useState(false);

    async function getData() {
        try {
            const value = await AsyncStorage.getItem('@alquimiaUser')
            const user = JSON.parse(value);
            console.log(value)
            if (value !== 'null' &&  user && user.uid) {
                // Navigate direct
            } else {
                props.navigation.navigate('Loging')
            }
        } catch (e) {
            props.navigation.navigate('Loging')
        }
    }

    getData();

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/images/logo.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 250,
        height: 200,
        resizeMode: 'stretch',
    }
});