import * as firebase from 'firebase';
import "firebase/firestore";

// import { firebaseConfig } from '../Enviroment';
// firebase.initializeApp(firebaseConfig);

import moment from "moment";


const db = firebase.firestore().collection('reservations');
let reservations = []

export async function getRemoteReservations(start, end) {
    reservations = [];
    console.log(moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD'));
    return await db.where('start', '>=', start).where('start', '<', end).get().then(querySnapshot => {
        querySnapshot.forEach(function (reserv) {
            const reservation = reserv.data();
            reservation.id = reserv.id;
            reservation.title = reservation.title.replace('\n\n', '');
            reservations.push(reservation);
        })
    }).then(res => {
        return reservations;
    })
}

export function add(reservation) {
    db.add(reservation).then(res => {
        console.log('reservation done')
    }).catch(err => {
        console.log('error', err)
    })
}

export function update(reservation) {
    db.doc(`${reservation.id}`).update(reservation).then(res => {
        console.log('reservation done')
    }).catch(err => {
        console.log(err)
    })
}

export function get() {
    return reservations;
}

export function getById(id) {
    return reservations.find(reserv => reserv.id === id);
}

export function set(reservationsArray) {
    reservations = reservationsArray;
}

export function deleteRemote(reservation) {
    db.doc(`${reservation.id}`).delete().then(res => {
        console.log('reservation done')
    }).catch(err => {
        console.log(err)
    })
}