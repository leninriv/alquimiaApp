import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import moment from "moment";
import Colors from '../constants/Colors';

import DatepickerRange from 'react-native-range-datepicker';

export default function DatePicker(props: any) {
    const [startDate, setStartDate] = useState(null);
    const [untilDate, setEndDate] = useState(null);
    const [openModal, setModalView] = useState(false);
    const { form } = props;

    useEffect(() => {
        if (form && form.start && form.end) {
            setStartDate(form.start);
            setEndDate(form.end);
        }
    });


    function setDates(dates) {
        dates.startDate && setStartDate(dates.startDate)
        dates.untilDate && setEndDate(dates.untilDate)
        props.onChangeForm && props.onChangeForm('dates_range', [moment(dates.startDate).valueOf(), moment(dates.untilDate).valueOf()])
        setModalView(false)
    }

    function onParseDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    return (
        <View style={styles.container} >

            <Text style={styles.label}>Fechas para la reserva</Text>
            {startDate && untilDate ?
                <Text style={styles.dates} onPress={() => { setModalView(true) }} >{onParseDate(startDate)}  /  {onParseDate(untilDate)}</Text> :
                <Text style={[styles.dates, styles.placeholder]} onPress={() => { setModalView(true) }} >ChekIn - ChekOut</Text>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => { }} >
                <DatepickerRange
                    startDate={form && form.startDate ? form.startDate : null}
                    untilDate={form && form.untilDate ? form.untilDate : null}
                    showReset={false}
                    showClose={true}
                    showSelectionInfo={false}
                    onClose={() => { setModalView(false) }}
                    buttonColor={Colors.primaryColor}
                    selectedBackgroundColor={Colors.primaryColor + '4D'}
                    onConfirm={(startDate, untilDate) => setDates({ startDate, untilDate })}
                />
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    },
    dates: {
        margin: 10,
        paddingBottom: 8,
        fontSize: 18,
        borderBottomColor: Colors.placeholder,
        borderBottomWidth: 2,
        color:'black'
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