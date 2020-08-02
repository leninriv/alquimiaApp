
import * as React from 'react';
import { Avatar } from 'react-native-elements';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

export default function RoomItem(props) {
    const { room } = props
    return (
        <TouchableOpacity style={styles.formGroup} onPress={props.selectValue}>
            <View>
                <Avatar
                    rounded
                    overlayContainerStyle={{ backgroundColor: room.color }}
                    size="small" />
            </View>
            <View style={styles.informationContainer}>
                <Text style={styles.title}>{room.room_number + ' - ' + room.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        backgroundColor: 'white',
        borderRadius: 8,
        minHeight: 60,
        paddingHorizontal: 15,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.5,
        elevation: 5,
        borderTopColor: Colors.shadow,
        borderTopWidth: 0.5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginHorizontal: 5
    },
    informationContainer: {
        paddingLeft: 15,
        paddingRight: 35
    },
    title: {
        fontSize: 18
    },
    description: {
        fontSize: 14,
        color: 'gray'
    }
});