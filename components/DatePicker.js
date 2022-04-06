import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Layout, Text } from '@ui-kitten/components';

export const DatePicker = () => {

    const initDate = new Date();
    const [date, setDate] = React.useState(initDate);

    return (
        <Layout style={styles.container} level='1'>

            <Text category='h6'>
                Selected date: {"\n" + date.toDateString()}
            </Text>

            <Datepicker
                placement={"left"}
                min={initDate}
                date={date}
                onSelect={nextDate => setDate(nextDate)}
            />

        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 50,
    },
});

export default DatePicker;