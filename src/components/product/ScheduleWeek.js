import React from 'react';
import { View } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import { CardSection, Button } from '../common';

const ScheduleWeek = ({ schedule, saveSchedule }) => {
  return (
    <View>
      <Formik
        initialValues={{ ...schedule }}
        onSubmit={(values, actions) => {
          actions.resetForm();
          saveSchedule(values);
        }}
      >
        {(props) => (
          <View>
            <CheckBox
              title='Lunes'
              checked={props.values.monday}
              onPress={() => props.setFieldValue('monday', !props.values.monday)}
            />
            <CheckBox
              title='Martes'
              checked={props.values.tuesday}
              onPress={() => props.setFieldValue('tuesday', !props.values.tuesday)}
            />
            <CheckBox
              title='Miercoles'
              checked={props.values.wednesday}
              onPress={() => props.setFieldValue('wednesday', !props.values.wednesday)}
            />
            <CheckBox
              title='Jueves'
              checked={props.values.thursday}
              onPress={() => props.setFieldValue('thursday', !props.values.thursday)}
            />
            <CheckBox
              title='Viernes'
              checked={props.values.friday}
              onPress={() => props.setFieldValue('friday', !props.values.friday)}
            />
            <CheckBox
              title='Sábado'
              checked={props.values.saturday}
              onPress={() => props.setFieldValue('saturday', !props.values.saturday)}
            />
            <CheckBox
              title='Domingo'
              checked={props.values.sunday}
              onPress={() => props.setFieldValue('sunday', !props.values.sunday)}
            />
            {/* <DateTimePicker
              value={props.values.openAt || new Date(1598051730000)}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={() => props.setFieldValue('openAt', props.values.openAt)}
            /> */}
            <CardSection>
              <Button onPress={props.handleSubmit}>
                Guardar
                  </Button>
            </CardSection>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ScheduleWeek;
