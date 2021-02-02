import React from 'react';
import { TextInput, Button } from '../common';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'No es valido'
  },
  number: {
    min: 'Debe ser mayor a ${min}'
  },
  string: {
    min: 'Ingrese al menos ${min} caracteres',
    max: 'Ingrese como maximo ${max} caracteres'
  }
});

const UserDataSchema = yup.object({
  firstName: yup.string()
    .label('Nombre')
    .required('Debes ingresar el ${label}.')
    .min(3)
    .max(25)
    .trim(),
  lastName: yup.string()
    .label('Apellidos')
    .required('Debes ingresar el ${label}.')
    .min(3)
    .max(25)
    .trim(),
});

const UserDataForm = ({ userData, updateUser }) => {
  const { firstName, lastName } = userData;

  return (   
    <View style={styles.container}>
      <Formik
        initialValues={{ firstName, lastName }}
        enableReinitialize={true}
        validationSchema={UserDataSchema}
        onSubmit={(values) => {
          updateUser(values);
        }}
      >
        {(props) => (
          <View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Nombre"
                placeholder="Ingrese el Nombre"
                value={props.values.firstName}
                onChangeText={props.handleChange('firstName')}
                errorMessage={props.touched.firstName && props.errors.firstName}
                onBlur={props.handleBlur('firstName')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Apellidos"
                placeholder="Ingrese Apellidos"
                value={props.values.lastName}
                onChangeText={props.handleChange('lastName')}
                errorMessage={props.touched.lastName && props.errors.lastName}
                onBlur={props.handleBlur('lastName')}
              />
            </View>   
            {
              props.values.firstName != firstName | props.values.lastName!= lastName ?
                (<Button style={styles.modalButtonStyle} onPress={props.handleSubmit}>Actualizar</Button>)
              : null
            }              
          </View>
        )}
      </Formik>
    </View>
  );
}
  
const styles = {
  container: {
    flex: 0,
    justifyContent: 'center'
  },
  inputView:{
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: '90%'
  },
  label: {

  },
  modalButtonStyle: {
    color: '#cc0000',
    flex:0
  }
};
    
export default UserDataForm;  