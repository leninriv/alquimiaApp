import React, { useState, useEffect } from "react";
import { Switch, View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import GlobalLayout from '../global_components/GlobalLayout';
import DatePicker from '../components/DatePicker';
import { Input, Button } from 'react-native-elements';
import Picker from '../components/Picker';
import ButtonOptions from '../components/ButtonOptions';
import { add, update, deleteRemote } from '../services/reservations';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';

function reservationToForm(reservation) {
    const form = {
        id: reservation.id,
        startDate: Math.trunc(reservation.start / 1000).toString(),
        untilDate: Math.trunc(reservation.end / 1000).toString(),
        start: reservation.start,
        end: reservation.end,
        title: reservation.title,
        room: reservation.room,
        reservation_type_index: reservationTypeIndex(reservation.reservation_type),
        cost: reservation.cost.toString(),
        people_number: reservation.people_number.toString(),
        airport_index: reservation.airport === 'yes' ? 1 : 0,
        payment_status: reservation.payment_status,
        payment_type_index: reservationPaymentIndex(reservation.payment_type),
        additional_info: reservation.additional_info,
        color: reservation.color
    }
    return form;
}

function reservationTypeIndex(type) {
    const types = {
        'booking': 0,
        'expedia': 1,
        'outside': 2
    }
    return types[type];
}

function reservationPaymentIndex(payment) {
    const types = {
        'cash': 0,
        'creditCard': 1,
        'expedia': 2
    }
    return types[payment];
}

function formToReservation(form) {
    const payments = ['cash', 'creditCard', 'expedia']
    const reservType = ['booking', 'expedia', 'outside']
    let reservation = {
        additional_info: form.additional_info || '',
        airport: form.airport_index === 1 ? 'yes' : 'no',
        color: form.color,
        room: form.room,
        cost: Math.round(parseFloat(form.cost) * 100) / 100,
        date_updated: Date.now(),
        end: form.end,
        nacionallity: 'none',
        payment_status: form.payment_status ? true : false,
        payment_type: payments[form.payment_type_index ? form.payment_type_index : 0],
        people_number: parseInt(form.people_number, 10),
        reservation_type: reservType[form.reservation_type_index ? form.reservation_type_index : 0],
        start: form.start,
        title: form.title
    }
    return reservation;
}

export default function ReservationScreen(props: any) {
    const { navigation, route } = props
    const [form, setForm] = useState(null);

    useEffect(() => {
        const reservation = route.params ? route.params.reservation : {}
        if (reservation) {
            const newReserv = reservationToForm(reservation);
            setForm(newReserv);
        }
    }, []);

    function toggle(value) {
        let newForm = { ...form };
        if (!newForm) { newForm = {} }
        if (newForm.title) { newForm.title = newForm.title.replace('$ ', '') }
        if (value) { newForm.title = '$ ' + newForm.title }
        newForm.payment_status = value;
        setForm(newForm);
    }

    function onChangeForm(key, value) {
        let newForm = { ...form };
        if (!newForm) { newForm = {} }
        if (key === 'dates_range') {
            newForm['start'] = value[0]
            newForm['end'] = value[1]
        } else if (key === 'selected_room') {
            newForm['room'] = value[0]
            newForm['color'] = value[1]
        } else {
            newForm[key] = value
        }
        setForm(newForm);
    }


    async function getUser() {
        try {
            let user: any = await AsyncStorage.getItem('@alquimiaUser');
            if (user) { user = JSON.parse(user) }
            return user
        } catch (error) { }
        return null
    }

    function deleteItem() {
        return (
            <TouchableOpacity onPress={popUpDelete}>
                <AntDesign name="delete" size={32} color="white" />
            </TouchableOpacity>
        );
    }

    function popUpDelete() {
        Alert.alert(
            "Borrar reservacion",
            "Esta reservacion se eliminara permanentemente, deseas continuar?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Borrar", onPress: () => deleteReservation() }
            ],
            { cancelable: false }
        );
    }

    function deleteReservation() {
        const reservationSaved = route.params ? route.params.reservationSaved : null
        if (form.id) {
            deleteRemote(form);
            reservationSaved && reservationSaved()
            props.navigation.goBack()
        }

    }

    async function saveReservation() {
        const reservationSaved = route.params ? route.params.reservationSaved : null
        if (form && form.id) {
            let updatedReserv: any = formToReservation(form)
            updatedReserv.id = form.id
            update(updatedReserv);
        } else {
            const user = await getUser()
            let reservation: any = formToReservation(form)
            reservation.author_id = user.uid
            reservation.date_created = Date.now()
            reservation.author_username = user.userName
            reservation.title = user.title.replace('\n\n','');
            add(reservation);
        }
        reservationSaved && reservationSaved()
        props.navigation.goBack()
    }

    return (
        <GlobalLayout {...props} headerTitle={"Reservacion"} rightComponent={deleteItem}>
            <TouchableOpacity style={styles.back} onPress={() => { props.navigation.goBack() }}>
                <Ionicons name="md-arrow-round-back" size={30} color="gray" />
            </TouchableOpacity>
            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={{ height: 10 }} />
                <DatePicker form={form} onChangeForm={onChangeForm} />
                <Input label='A nombre de:' onChangeText={(value) => { onChangeForm('title', value) }} placeholder='Nombre del turista' value={form ? form.title : ''} />
                <Picker value={form ? form.room : ''} onChangeForm={onChangeForm} />
                <ButtonOptions options={['Booking', 'Expedia', 'Outside']} label={'Tipo de reserva'} selectedIndex={form ? form.reservation_type_index : 0} onPress={(newIndex) => { onChangeForm('reservation_type_index', newIndex) }} />
                <View style={styles.inputContent}>
                    <View style={{ width: '45%' }}>
                        <Input keyboardType='numeric' onChangeText={(value) => { onChangeForm('cost', value) }} label='Precio Final' placeholder='Precio $' value={form ? form.cost : 0} />
                    </View>
                    <View style={{ width: '45%' }}>
                        <Input keyboardType={'numeric'} onChangeText={(value) => { onChangeForm('people_number', value) }} label='Numero de Personas' placeholder='Personas' value={form ? form.people_number : ''} />
                    </View>
                </View>
                <ButtonOptions options={['No', 'Si']} label={'Trasfer desde el aeropuerto'} selectedIndex={form ? form.airport_index : 0} onPress={(newIndex) => { onChangeForm('airport_index', newIndex) }} />
                <View style={styles.paymentContent}>
                    <Text style={styles.label}>Pago realizado</Text>
                    <Switch
                        onValueChange={toggle}
                        value={form ? form.payment_status : false}
                    />
                </View>
                <ButtonOptions disabled={form ? !form.payment_status : true} options={['Efectivo', 'Tarjeta C.', 'ExpediaC.']} label={'Tipo de pago'} selectedIndex={form ? form.payment_type_index : 0} onPress={(newIndex) => { onChangeForm('payment_type_index', newIndex) }} />

                <Input label='Informacion adicional' onChangeText={(value) => { onChangeForm('additional_info', value) }} multiline={true} placeholder='Notas' value={form ? form.additional_info : ''} />
                <View style={{ height: 10 }} />

                <View style={{ paddingHorizontal: 10 }}>
                    <Button title="Guardar" buttonStyle={{ backgroundColor: Colors.primaryColor }} onPress={() => { saveReservation() }} />
                </View>
                <View style={{ height: 25 }} />
            </ScrollView>
        </GlobalLayout>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    inputContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paymentContent: {
        display: 'flex',
        alignItems: 'flex-start',
        paddingBottom: 15
    },
    label: {
        color: Colors.label,
        fontSize: 16,
        marginHorizontal: 10,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    back: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        marginHorizontal: 5
    },
});
