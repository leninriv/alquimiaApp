import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { Header } from 'react-native-elements';

import Colors from '../constants/Colors';

function DrawerMenuIcon(data: any) {
    const { props } = data;
    return (
        <TouchableOpacity onPress={() => { props.navigation.dispatch(DrawerActions.openDrawer()) }}>
            <Ionicons name="ios-menu" size={32} color="white" />
        </TouchableOpacity>
    );
}

export default function GoblalHeader(props: any) {
    return (
        <View >
            <Header
                containerStyle={{
                    backgroundColor: Colors.primaryColor
                }}
                leftComponent={<DrawerMenuIcon props={props} />}
                centerComponent={{ text: props.title, style: { color: '#fff', fontSize: 18 } }}
                rightComponent={props.rightComponent ? props.rightComponent : <View />}
            />
        </View>
    )
}