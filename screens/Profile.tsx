import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

import { signOut } from '../services/auth'
import GlobalLayout from '../global_components/GlobalLayout';

export default function ProfileScreen(props) {

    async function logOut() {
        signOut();
    }

    return (
        <GlobalLayout {...props} headerTitle={"Perfil"}>
            <View style={styles.container}>
                <Button title="Log out" buttonStyle={styles.button} onPress={() => { logOut() }} />
            </View>
        </GlobalLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: Colors.primaryColor,
    }
});