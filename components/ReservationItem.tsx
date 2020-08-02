
import * as React from 'react';
import { Avatar } from 'react-native-elements';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import moment from "moment";

import Colors from '../constants/Colors';


// icon={{name: 'arrow-up', type: 'font-awesome'}}
// icon={{name: 'bed', type: 'font-awesome'}}
// <TouchableOpacity style={styles.formGroup} onPress={() => { props.navigation.navigate('Reservation', { reservation: reservation.id })}}>


function avatarRender(reservation: any, dateSelected) {
    let color = 'gray'
    let icon = 'bed'
    //console.log(moment(dateSelected).format('YYYY-MM-DD'), moment(reservation.start).format('YYYY-MM-DD'))
    if (dateSelected === reservation.start) {
        color = 'green';
        icon = 'arrow-down';
    } else if (dateSelected > reservation.start && dateSelected < reservation.end) {
        color = 'gray';
        icon = 'bed';
    } else if (dateSelected === reservation.end) {
        color = 'red';
        icon = 'arrow-up';
    }

    return (
        <Avatar
            rounded
            overlayContainerStyle={{ backgroundColor: color }}
            size="small"
            icon={{ name: icon, type: 'font-awesome' }} />
    )
}

export default function ReservationItem(props) {
    const { reservation, dateSelected } = props
    return (
        <TouchableOpacity style={styles.formGroup} onPress={() => { props.navigation.navigate('Reservation', { reservation, reservationSaved: props.reservationSaved }) }}>
            <View>
                {avatarRender(reservation, dateSelected)}
            </View>
            {!!reservation &&
                <View style={styles.informationContainer}>
                    <Text style={styles.title}>{reservation.title}</Text>
                    <Text style={styles.description}>{reservation.reservation_type + ' / ' + ' Costo :  $' + reservation.cost}</Text>
                    {!!reservation.additional_info && <Text style={styles.description}>{reservation.additional_info}</Text>}
                </View>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 8,
        minHeight: 50,
        padding: 15,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        flexDirection: 'row'
    },
    informationContainer: {
        paddingLeft: 15,
        paddingRight: 35,
    },
    title: {
        fontSize: 18
    },
    description: {
        fontSize: 14,
        color: 'gray'
    }
});