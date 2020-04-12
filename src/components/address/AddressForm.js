import React from 'react';
import { TextInput, Button } from '../common';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const AddressSchema = yup.object({
  name: yup.string()
    .required()
    .min(3),
  street: yup.string()
    .required()
    .min(3),
  streetReference: yup.string()
    .required()
    .min(3),
  numberStreet: yup.string()
    .required()
    .min(3),
  departmentNumber: yup.string()
    .min(1),
  city: yup.string()
    .required()
    .min(4),
  town: yup.string()
    .required()
    .min(4),
  phone: yup.string()
    .required()
    .min(2),
});

const AddressForm = ({ address, saveAddress }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ ...address }}
        validationSchema={AddressSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          saveAddress(values);
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
                value={props.values.name}
                onChangeText={props.handleChange('name')}
                errorMessage={props.touched.name && props.errors.name}
                onBlur={props.handleBlur('name')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Direccion"
                placeholder="Ingrese la calle"
                value={props.values.street}
                onChangeText={props.handleChange('street')}
                errorMessage={props.touched.street && props.errors.street}
                onBlur={props.handleBlur('street')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Referencia"
                placeholder="Ingrese la zona, nombre del edificio"
                value={props.values.streetReference}
                onChangeText={props.handleChange('streetReference')}
                errorMessage={props.touched.streetReference && props.errors.streetReference}
                onBlur={props.handleBlur('streetReference')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Numero del Edificio/Casa"
                placeholder="Ingrese la numeracion"
                value={props.values.numberStreet}
                onChangeText={props.handleChange('numberStreet')}
                errorMessage={props.touched.numberStreet && props.errors.numberStreet}
                onBlur={props.handleBlur('numberStreet')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Numero del departamento"
                placeholder="Ingrese el numero del departamento"
                value={props.values.departmentNumber}
                onChangeText={props.handleChange('departmentNumber')}
                errorMessage={props.touched.departmentNumber && props.errors.departmentNumber}
                onBlur={props.handleBlur('departmentNumber')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Ciudad"
                placeholder="Ingrese la ciudad"
                value={props.values.city}
                onChangeText={props.handleChange('city')}
                errorMessage={props.touched.city && props.errors.city}
                onBlur={props.handleBlur('city')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Distrito"
                placeholder="Ingrese la distrito"
                value={props.values.town}
                onChangeText={props.handleChange('town')}
                errorMessage={props.touched.town && props.errors.town}
                onBlur={props.handleBlur('town')}
              />
            </View>
            <View style={styles.inputView} >
              <TextInput
                inputStyle={styles.input}
                labelStyle={styles.label}
                label="Numero de telefono"
                value={props.values.phone}
                onChangeText={props.handleChange('phone')}
                keyboardType='numeric'
                errorMessage={props.touched.phone && props.errors.phone}
                onBlur={props.handleBlur('phone')}
              />
            </View>
            <Button style={styles.modalButtonStyle} onPress={props.handleSubmit}>Guardar</Button>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
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
    color: '#cc0000'
  }
};

export default AddressForm;
