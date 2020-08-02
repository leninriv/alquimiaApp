import * as React from 'react';
import { View } from 'react-native';
import GoblalHeader from './GlobalHeader'

export default function GlobalLayout(props: any) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <GoblalHeader navigation={props.navigation} title={props.headerTitle} rightComponent={props.rightComponent}/>
            <View style={{ flex: 1, padding: 5 }}>
                {props.children}
            </View>
        </View>
    )
}