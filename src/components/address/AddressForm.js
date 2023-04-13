import React, { useState  } from 'react';
import { TextInput, Button, GoogleMap, CardSection, Title, Content } from '../common';
import { View } from 'react-native';
import { Size, Colors } from '../../constants/Styles';
import { Overlay, Icon } from 'react-native-elements'
import { Formik } from 'formik';
import * as yup from 'yup';
import { setLocale } from 'yup';

setLocale({
  mixed: {
    default: 'No es valido',
  },
  number: {
    min: 'Debe ser mayor a ${min}',
  },
  string: {
    min: 'Ingrese al menos ${min} caracteres'
  }
});

const AddressSchema = yup.object({
  name: yup.string()
    .label('Alias')
    .required('Debes ingresar el ${label}.')
    .min(3)
    .trim(),
  street: yup.string()
    .label('Dirección')
    .required('Debes ingresar el ${label}.')
    .min(3)
    .trim('trimeando'),
  streetReference: yup.string()
    .label('Referencia')
    .required('Debes ingresar una ${label} de tu dirección')
    .min(3)
    .trim(),
  numberStreet: yup.string()
    .label('Numero de la casa/edificio')
    .required('Debes ingresar el ${label}')
    .min(3)
    .trim(),
  departmentNumber: yup.string()
    .label('Numero del departamento')
    .min(1)
    .trim(),
  city: yup.string()
    .label('Ciudad')
    .required('Debes ingresar la ${label}')
    .min(4)
    .trim(),
  town: yup.string()
    .label('Municipio')
    .required('Debes ingresar el ${label}')
    .min(4)
    .trim(),
  phone: yup.string()
    .label('Telefono/Celular')
    .required('Debes ingresar tu numero de ${label}')
    .min(7)
    .trim(),
});

const AddressForm = ({ address, saveAddress }) => {

  const [isVisible, setIsVisible] = useState(false);
  
  const showModal = () => {
    setIsVisible(true);
  }

  const onDragEndMarker = (props, coordinate) => {
    const { latitude, longitude } = coordinate;
    props.setFieldValue('latitude', latitude);
    props.setFieldValue('longitude', longitude);
  }

  const renderMapModal = (props) => {

    const showAddressInfo = () => {
      if(props.values.street && props.values.streetReference && props.values.numberStreet && props.values.city && props.values.town){
        let addressInfo = `${props.values.street} Nº${props.values.numberStreet} ${props.values.streetReference}, ${props.values.town}`;
        return(
          <View>
            <CardSection style={styles.cardSectionStyle}>
              <Icon
                name='ios-pin'
                type='ionicon'
                size={Size.iconInput}
                color={Colors.secondaryText}
                iconStyle={styles.iconStyle}
              />
              <Content style={styles.styleTextAddressInfo} numberOfLines={2} ellipsizeMode='tail'>{addressInfo}</Content>
            </CardSection>
            <Button onPress={() => setIsVisible(false)} style={styles.styleButtonMap} textStyle={styles.styleButtonTextMap}>Confirmar Direccion</Button>
          </View>  
        )
      }
    }
    return (
      <Overlay
      width="auto"
      height="90%"
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      >        
        <View>
          <Title>
          Arrastra el marcador hasta su dirección
          </Title>
          <GoogleMap
            marker={{
              title: 'Georeferencia',
              description: 'Arrastre hasta la dirección de su ubicación',
              latitude: props.values.latitude,
              longitude: props.values.longitude,
              onDragEnd: (coordinate) => onDragEndMarker(props, coordinate)
            }}
          />
            {showAddressInfo()}
        </View>
      </Overlay>
    );
  }

  const buttonGeoreference = (props) => {
    if( props.values.name && props.values.street && props.values.numberStreet && props.values.city && props.values.town) {
      return(
      <Button onPress={showModal}>
        Mostrar Mapa
      </Button>
      )
    }else {
      return(
        <Button style={styles.styleButtonDisable} textStyle={styles.styleButtonDIsableTextMap}>
          Mostrar Mapa
        </Button>
      )
    }
  }
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
                label="Alias"
                placeholder="Ingrese el alias ej. Hogar"
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
                label="Numero del departamento (Opcional)"
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
                label="Municipio"
                placeholder="Ingrese el municipio"
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
            <CardSection style={{ flexDirection: 'column'}}>
              <Title style={{paddingBottom: 10}}>
                Georeferencia
              </Title>
              {buttonGeoreference(props)}            
            </CardSection>
            {renderMapModal(props)}   
            <CardSection style={{ flexDirection: 'column'}}>             
              <Button style={styles.modalButtonStyle} onPress={props.handleSubmit}>Guardar</Button>
            </CardSection>
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
  styleButtonMap: {
    flex:0,
    backgroundColor: Colors.primaryRed,
    borderColor: Colors.primaryRed
  },
  styleButtonTextMap: {
		color: Colors.primaryTextInverse
	},
  modalButtonStyle: {
    color: '#cc0000'
  },
  styleButtonDisable: {
    borderColor: Colors.disable
  },
  styleButtonDIsableTextMap: {
    color: Colors.disable
  },
  styleTextAddressInfo: {
    marginTop: 0,
    marginRight: 15,
    alignSelf: 'center'
  }
};

export default AddressForm;
