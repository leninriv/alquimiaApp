import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { Input, Button } from 'react-native-elements';
import Colors from '../constants/Colors';

import { Loging, signOut } from '../services/auth'

export default function LogingScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, selLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    async function logingAction(email, pass) {
        setError(false);
        selLoading(true);
        setError(!await Loging(email, pass));
        selLoading(false);
        // signOut();
    }

    return (
        <View style={styles.container}>
            <Input
                label='Email'
                placeholder='Email'
                autoCapitalize='none'
                autoCompleteType='email'
                errorStyle={{ color: 'red' }}
                onChangeText={setUsername}
            />
            <Input
                label='Contrasena'
                placeholder='Password'
                autoCapitalize='none'
                autoCompleteType='off'
                onChangeText={setPassword}
                errorMessage={error ? 'Credenciales incorrectas' : null}
                secureTextEntry
            />
            <View style={{ height: 15 }} />
            <Button title="Sign in" loading={loading} buttonStyle={styles.button} onPress={() => { logingAction(username, password) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 40,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: Colors.primaryColor,
    }
});