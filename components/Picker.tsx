import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";
import { getById } from '../services/rooms'

import { AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import RoomItem from "./RoomItem";
import { get, getRemoteRooms } from '../services/rooms'


function getRoomData(id) {
    return getById(id);
}

export default function Picker(props: any) {
    const [selectedValue, setValue] = useState(null);
    const [openModal, setModalView] = useState(false);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        loadRooms();
        if (props.value) {
            const room = getRoomData(props.value);
            if (room) {
                setValue(room);
            }
        }
    }, [props.value]);

    async function loadRooms() {
        let roomsArray: any = get();
        if (!roomsArray) {
            roomsArray = await getRemoteRooms();
        }
        setRooms(roomsArray)
    }

    function selectValue(value) {
        setValue(value)
        setModalView(false)
        props.onChangeForm && props.onChangeForm('selected_room', [value.id, value.color])
        console.log(value)
    }

    return (
        <View style={styles.container} >
            <Text style={styles.label}>Habitacion</Text>
            {!!selectedValue ?
                <Text style={styles.value} onPress={() => { setModalView(true) }} >{selectedValue.name}</Text> :
                <Text style={[styles.value, styles.placeholder]} onPress={() => { setModalView(true) }} >Seleccionar habitacion</Text>
            }
            <Modal
                animationType="slide"
                transparent={false}
                visible={openModal}
                onRequestClose={() => { }} >

                <View style={styles.listContent}>
                    <TouchableOpacity style={styles.close} onPress={() => { setModalView(false) }}>
                        <AntDesign name="closecircleo" size={30} color="gray" />
                    </TouchableOpacity>

                    <ScrollView
                        showsVerticalScrollIndicator={false} >
                        <View style={{ height: 15 }} />
                        {rooms && rooms.length &&
                            rooms.map(room => <RoomItem key={room.id} room={room} selectValue={() => { selectValue(room) }} />)
                        }
                        <View style={{ height: 30 }} />
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    },
    listContent: {
        padding: 10
    },
    close: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingBottom: 15
    },
    value: {
        margin: 10,
        paddingBottom: 8,
        fontSize: 18,
        borderBottomColor: Colors.placeholder,
        borderBottomWidth: 2
    },
    placeholder: {
        color: Colors.placeholder
    },
    label: {
        color: Colors.label,
        fontSize: 16,
        marginHorizontal: 10,
        fontWeight: 'bold'
    }
});