import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView } from "react-native";

import { ButtonGroup } from 'react-native-elements';

import Colors from '../constants/Colors';

export default function ButtonOptions(props: any) {

    function onChangeIndex(selection) {
        props.onPress && props.onPress(selection)
    }

    return (
        <View style={styles.content}>
            <Text style={styles.label}>{props.label}</Text>
            <ButtonGroup
                disabled={props.disabled}
                onPress={(selection) => { onChangeIndex(selection) }}
                selectedIndex={props.selectedIndex ? props.selectedIndex : 0}
                selectedButtonStyle={styles.buttonSelected}
                buttons={props.options}
                containerStyle={{ height: 40 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingBottom: 15
    },
    label: {
        color: Colors.label,
        fontSize: 16,
        marginHorizontal: 10,
        fontWeight: 'bold',
        paddingBottom: 10
    },
    buttonSelected: {
        backgroundColor: Colors.primaryColor
    }
});