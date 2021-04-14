import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { Button } from './Button';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatetimePicker = ({ value, onChange, style, textButton, ...props }) => {

  const [show, setShow] = useState(false);

  const renderDateTimePickerAndroid = () => {
    return (
      <View>
        <View>
          <Button onPress={() => setShow(true)}>{textButton ? textButton : 'Mostrar Calendario/Reloj'}</Button>
        </View>
        {show && (<DateTimePicker
          value={value ? new Date(value) : new Date()}
          onChange={(e, date) => { setShow(false); onChange(date ? date : value); }}
          style={props.style}
          {...props}
        />)}
      </View>
    );
  }
  return (
    <View>
    {
      Platform.OS === 'ios' ?
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          onChange={(e, date) => onChange(date)}
          style={style}
          {...props}
        /> : 
          renderDateTimePickerAndroid()
    }
    </View>
  );
};

export { DatetimePicker };
