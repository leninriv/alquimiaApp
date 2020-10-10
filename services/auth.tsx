import { NativeModules } from "react-native";
import {Restart} from 'fiction-expo-restart';
import * as firebase from 'firebase';
import "firebase/auth";
import AsyncStorage from '@react-native-community/async-storage';

export async function Loging(email, password) {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async res => {
            if (res.user) {
                await setInStorage({ email: res.user.email, uid: res.user.uid, userName: res.user.email })
            }
            Restart();
            return true;
        }).catch(err => {
            console.log(err)
            return false
        });
}

export async function signOut() {
    await setInStorage('null');
    await firebase.auth().signOut();
    Restart();
}

async function setInStorage(user) {
    try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem('@alquimiaUser', jsonValue)
        console.log('usuario seteado')
    } catch (e) {
        // saving error
        console.log(e)
    }
}
