import * as React from 'react';
import { View } from 'react-native';
import moment from "moment";

import { Calendar } from 'react-native-calendars';

export default function CalendarComponent(props: any) {
    return (
        <View>
            <Calendar
                current={moment().format('YYYY-MM-DD')}
                firstDay={1}
                horizontal={true}
                pagingEnabled={true}
                // markedDates={{
                //     '2020-07-04': { selected: true, selectedColor: 'blue' },
                //     '2020-07-06': { marked: true, dotColor: 'red' }
                // }}
                markedDates={props.calendarMarkers}
                onDayPress={(day) => { props.onDayPress(day) }}
                onMonthChange={(month) => { props.onMonthChange(month)}}
            />
        </View>

    );
}
