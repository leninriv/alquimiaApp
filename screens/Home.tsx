import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import GlobalLayout from '../global_components/GlobalLayout';
import CalendarComponent from '../components/Calendar';
import ReservationItem from '../components/ReservationItem';
import { getRemoteRooms } from "../services/rooms";
import Colors from '../constants/Colors';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import moment from "moment";
import { getRemoteReservations } from "../services/reservations";

function getMonthStartEndDates(date, dayOffset) {
    return {
        start: moment(date).startOf('month').subtract(dayOffset, 'd').valueOf(),
        end: moment(date).endOf('month').add(dayOffset, 'd').valueOf()
    };
}

function calculateList(allReservations, daySelected) {
    let newArrayReserv = [];
    for (const reservation of allReservations) {
        if (daySelected >= reservation.start && daySelected <= reservation.end) {
            newArrayReserv.push(reservation);
        }
    }
    return newArrayReserv;
}

let listView;

export default function HomeScreen(props: any) {
    const { navigation } = props;
    const [rooms, setRooms] = useState(null);
    const [dateSelected, setDateSelected] = useState(moment().startOf('day').valueOf());
    const [reservationsList, setReservations] = useState(null);
    const [allReservations, setAllReserv] = useState(null);
    const [calendarMarkers, setCalendaMarkers] = useState({ [moment().format('YYYY-MM-DD')]: { selected: true, selectedColor: 'blue' } });

    async function getRooms() {
        const roomsArray: any = await getRemoteRooms()
        setRooms[roomsArray ? roomsArray : null];
    }

    function refreshList() {
        return (
            <TouchableOpacity onPress={refreshFromApi}>
                <Ionicons name="ios-refresh" size={32} color="white" />
            </TouchableOpacity>
        );
    }

    async function getReservationsPerMonth(start, end, selectedDate) {
        const allReserv = await getRemoteReservations(start, end);
        setAllReserv(allReserv);
        const reservList = calculateList(allReserv, selectedDate ? selectedDate : start);
        setReservations(reservList);
    }

    function onChangeCalendarDay(daySelected: any) {
        listView.scrollTo({ y: 0 })
        const markedDates = {}
        const compesation = moment(daySelected.timestamp).add(new Date().getTimezoneOffset(), 'minutes')
        markedDates[compesation.format('YYYY-MM-DD')] = { selected: true, selectedColor: 'blue' }
        // TODO: render all calendar markers again
        setCalendaMarkers(markedDates);
        setDateSelected(compesation.valueOf());
        setReservations(calculateList(allReservations, compesation.valueOf()));
    }

    function reservationSaved() {
        setTimeout(() => {
            refreshFromApi()
        }, 2000);
    }

    function refreshFromApi() {
        const { start, end } = getMonthStartEndDates(dateSelected, 7);
        getReservationsPerMonth(start, end, dateSelected);
    }

    async function onMonthChange(month) {
        console.log(month)
        const { start, end } = getMonthStartEndDates(month.timestamp, 7);
        await getReservationsPerMonth(start, end, start);
        // onChangeCalendarDay({ timestamp: start });

    }

    useEffect(() => {
        const { start, end } = getMonthStartEndDates(new Date().getTime(), 7);
        getReservationsPerMonth(start, end, dateSelected);
        getRooms();
    }, []);

    return (

        <GlobalLayout {...props} headerTitle={"Inicio"} addIcon={true} rightComponent={refreshList}>
            <CalendarComponent
                calendarMarkers={calendarMarkers}
                onDayPress={onChangeCalendarDay}
                onMonthChange={onMonthChange}
            />
            <ScrollView showsVerticalScrollIndicator={false} ref={ref => listView = ref}>
                {
                    !!reservationsList && reservationsList.length ? reservationsList.map((reserv, i) => (
                        <ReservationItem
                            key={i}
                            dateSelected={dateSelected}
                            reservation={reserv}
                            navigation={props.navigation}
                            loadReservations={getRooms}
                            reservationSaved={reservationSaved}
                        />
                    )) :
                        <View style={styles.noDataContainer}>
                            <AntDesign name="inbox" size={80} color="gray" />
                            <Text>No hay reservaciones</Text>
                        </View>

                }
                <View style={{ height: 90 }} />
            </ScrollView>
            <TouchableOpacity style={styles.fabButton} onPress={() => { props.navigation.navigate('Reservation', { reservation: null, reservationSaved }) }}>
                <Ionicons name="md-add-circle-outline" size={40} color="white" />
            </TouchableOpacity>
        </GlobalLayout>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fabButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
        borderRadius: 65,
        backgroundColor: Colors.primaryColor,
        bottom: 20,
        right: 20
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40
    }
});
