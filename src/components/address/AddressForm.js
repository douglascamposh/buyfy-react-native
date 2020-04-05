import React from 'react';
import { connect } from 'react-redux';
import { addressUpdateForm } from '../../actions';
import { InputText } from '../common';
import { View } from 'react-native';

const AddressForm = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputView} >
        <InputText
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Direccion"
          placeholder="Ingrese la calle"
          value={props.street}
          onChangeText={value => props.addressUpdateForm({ prop: 'street', value })}
        />
      </View>
      <View style={styles.inputView} >
        <InputText
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Referencia"
          placeholder="Ingrese la zona, nombre del edificio"
          value={props.streetReference}
          onChangeText={value => props.addressUpdateForm({ prop: 'streetReference', value })}
        />
      </View>
      <View style={styles.inputView} >
        <InputText
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Numero del Edificio/Casa"
          placeholder="Ingrese la numeracion"
          value={props.numberStreet}
          onChangeText={value => props.addressUpdateForm({ prop: 'numberStreet', value })}
        />
      </View>
      <View style={styles.inputView} >
        <InputText
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Numero del departamento"
          placeholder="Ingrese el numero del departamento"
          value={props.departmentNumber}
          onChangeText={value => props.addressUpdateForm({ prop: 'departmentNumber', value })}
        />
      </View>
      <View style={styles.inputView} >
        <InputText
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Ciudad"
          placeholder="Ingrese la ciudad"
          value={props.city}
          onChangeText={value => props.addressUpdateForm({ prop: 'city', value })}
        />
      </View>
      <View style={styles.inputView} >
        <InputText
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Distrito"
          placeholder="Ingrese la distrito"
          value={props.town}
          onChangeText={value => props.addressUpdateForm({ prop: 'town', value })}
        />
      </View>
      <View style={styles.inputView} >
        <InputText
          inputStyle={styles.input}
          labelStyle={styles.label}
          label="Numero de telefono"
          value={props.phone}
          onChangeText={value => props.addressUpdateForm({ prop: 'phone', value })}
        />
      </View>
    </View>
  );
}

const styles = {
  cardSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView:{
    width: "90%",
    justifyContent: "center",
    marginBottom: 20,
  }
};

const mapStateToProps = (state, props) => {
  const { street, numberStreet, departmentNumber, city, town, streetReference, phone, uid } = state.addressForm;
  return { street, numberStreet, departmentNumber, city, town, streetReference, phone, uid };
}

export default connect(mapStateToProps, { addressUpdateForm })(AddressForm);
