import * as firebase from 'firebase';
import "firebase/firestore";
import { firebaseConfig } from '../Enviroment';

// firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection('rooms');
let rooms = []

export async function getRemoteRooms() {
    rooms = [];
    return await db.get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            const room = doc.data();
            room.id = doc.id;
            rooms.push(room);
        });
    }).then(res => {
        return rooms;
    })
}

export function get() {
    return rooms;
}

export function getById(roomId) {
    return rooms.find(room => room.id === roomId);
}

export function set(roomsArray) {
    rooms = roomsArray;
}