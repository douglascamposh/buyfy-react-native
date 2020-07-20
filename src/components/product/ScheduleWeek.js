import React from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import { CardSection, Button, Title } from '../common';
import * as yup from 'yup';

// const ScheduleSchema = yup.object({
//   openAt: yup.date()
//     .label('Hora de apertura')
//     .required('Debes ingresar el ${label}.'),
//   closeAt: yup.date()
//     .label('Hora de cierre')
//     .required('Debes ingresar el ${label}.')
//     .when(
//       "openAt",
//       (openAt, schema) => openAt && schema.min(openAt, "La ${label} no puede ser antes de la apertura"))
// });

const ScheduleWeek = ({ schedule, saveSchedule }) => {
  return (
    <Formik
      initialValues={{ ...schedule }}
      onSubmit={(values, actions) => {
        const copyValues = {...values};
        copyValues.openAt = (new Date(copyValues.openAt)).getTime();
        copyValues.closeAt = (new Date(copyValues.closeAt)).getTime();
        actions.resetForm();
        saveSchedule(copyValues);
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
            <Title>Ingrese la hora de apertura</Title>
            <DateTimePicker
              value={props.values.openAt ? new Date(props.values.openAt) : new Date()}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={(e, date) => props.setFieldValue('openAt', date)}
              style={styles.timePickerStyle}
            />
            <Title>Ingrese la hora de cierre</Title>
            <DateTimePicker
              value={props.values.closeAt ? new Date(props.values.closeAt) : new Date()}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={(e, date) => props.setFieldValue('closeAt', date)}
              style={styles.timePickerStyle}
            />
          <CardSection>
            <Button onPress={props.handleSubmit}>
              Guardar
            </Button>
          </CardSection>
        </View>
      )}
    </Formik>
  );
}

const styles = {
  timePickerStyle: {
    height: 116
  }
}

export default ScheduleWeek;
