import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, ImagePicker, TextInput, Button, Title, GoogleMap } from '../common';
import { Overlay } from 'react-native-elements';
import * as ExpoImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup';

const StoreSchema = yup.object({
  name: yup.string()
    .label('Nombre')
    .required('Debes ingresar el ${label}.')
    .min(3, 'El ${label} es muy corto, ingresa minimo 3 caracteres.')
    .max(30, 'El ${label} es muy largo, ingresa maximo 30 caracteres.')
    .trim(),
  description: yup.string()
    .label('Descripción')
    .required('Debes ingresar la ${label}.')
    .min(3, 'La ${label} es muy corta, ingresa minimo 3 caracteres.')
    .max(100, 'La ${label} es muy larga, ingresa maximo 100 caracteres.')
    .trim('description')
});

class StoreForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  // Custom value formik
  onChooseImagePress = async (props) => {
    let result = await ExpoImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      props.setFieldValue('image', result.uri);
    }
  }

  showModal = () => {
    this.setState({ isVisible: true });
  }

  onDragEndMarker = (props, coordinate) => {
    const { latitude, longitude } = coordinate;
    props.setFieldValue('latitude', latitude);
    props.setFieldValue('longitude', longitude);
  }

  renderModalAddressList = (props) => {
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
      >
        <View>
          <Title>
            Arrastra el marcador hasta la dirección de la tienda
          </Title>
          <GoogleMap
            marker={{
              title: 'Georeferencia tienda',
              description: 'Arrastre hasta la dirección de la tienda',
              latitude: props.values.latitude,
              longitude: props.values.longitude,
              onDragEnd: (coordinate) => this.onDragEndMarker(props, coordinate)
            }}
          />
        </View>
      </Overlay>
    );
  }

  render() {
    const { store, saveStore } = this.props;
    return (
      <View>
        <Formik
          initialValues={{ ...store }}
          validationSchema={StoreSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            saveStore(values);
          }}
        >
          {(props) => (
            <View>              
              <CardSection>
                <TextInput
                  label="Nombre"
                  placeholder="Nombre de la tienda"
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  errorMessage={props.touched.name && props.errors.name}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Descripcion"
                  placeholder="Descripcion del tienda"
                  value={props.values.description}
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                  errorMessage={props.touched.description && props.errors.description}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Tiempo promedio de entrega"
                  placeholder="Ingrese el tiempo estimado de entrega"
                  value={props.values.deliveryTime}
                  onChangeText={props.handleChange('deliveryTime')}
                  onBlur={props.handleBlur('deliveryTime')}
                  errorMessage={props.touched.deliveryTime && props.errors.deliveryTime}
                  keyboardType='numeric'
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Costo de envío"
                  placeholder="Costo de envío"
                  value={props.values.shippingCost}
                  onChangeText={props.handleChange('shippingCost')}
                  onBlur={props.handleBlur('shippingCost')}
                  errorMessage={props.touched.shippingCost && props.errors.shippingCost}
                  keyboardType='numeric'
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Pedido minimo para envío"
                  placeholder="Ingrese el pedido minimo para envío"
                  value={props.values.minimumCost}
                  onChangeText={props.handleChange('minimumCost')}
                  onBlur={props.handleBlur('minimumCost')}
                  errorMessage={props.touched.minimumCost && props.errors.minimumCost}
                  keyboardType='numeric'
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Categoria"
                  placeholder="Ingrese la Categoria"
                  value={props.values.category}
                  onChangeText={props.handleChange('category')}
                  onBlur={props.handleBlur('category')}
                  errorMessage={props.touched.category && props.errors.category}
                />
              </CardSection>
              
              <CardSection style={{ flexDirection: 'column' }}>
                <Title style={{ paddingBottom: 10 }}>
                  Agregar Logo de la tienda
                </Title>
                <ImagePicker
                  onPress={() => this.onChooseImagePress(props)}
                  image={props.values.image}
                >Elegir Logo de la tienda</ImagePicker>
              </CardSection>
              <CardSection>
                <TextInput
                  label="Direccion"
                  placeholder="Ingrese la calle"
                  value={props.values.street}
                  onChangeText={props.handleChange('street')}
                  errorMessage={props.touched.street && props.errors.street}
                  onBlur={props.handleBlur('street')}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Referencia"
                  placeholder="Ingrese la zona, nombre del edificio"
                  value={props.values.streetReference}
                  onChangeText={props.handleChange('streetReference')}
                  errorMessage={props.touched.streetReference && props.errors.streetReference}
                  onBlur={props.handleBlur('streetReference')}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Numero del Edificio/Casa"
                  placeholder="Ingrese la numeracion"
                  value={props.values.numberStreet}
                  onChangeText={props.handleChange('numberStreet')}
                  errorMessage={props.touched.numberStreet && props.errors.numberStreet}
                  onBlur={props.handleBlur('numberStreet')}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Numero del departamento"
                  placeholder="Ingrese el numero del departamento"
                  value={props.values.departmentNumber}
                  onChangeText={props.handleChange('departmentNumber')}
                  errorMessage={props.touched.departmentNumber && props.errors.departmentNumber}
                  onBlur={props.handleBlur('departmentNumber')}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Ciudad"
                  placeholder="Ingrese la ciudad"
                  value={props.values.city}
                  onChangeText={props.handleChange('city')}
                  errorMessage={props.touched.city && props.errors.city}
                  onBlur={props.handleBlur('city')}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Distrito"
                  placeholder="Ingrese la distrito"
                  value={props.values.town}
                  onChangeText={props.handleChange('town')}
                  errorMessage={props.touched.town && props.errors.town}
                  onBlur={props.handleBlur('town')}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Numero de telefono"
                  value={props.values.phone}
                  onChangeText={props.handleChange('phone')}
                  keyboardType='phone-pad'
                  errorMessage={props.touched.phone && props.errors.phone}
                  onBlur={props.handleBlur('phone')}
                />
              </CardSection>
              <CardSection style={{ flexDirection: 'column'}}>
                <Title style={{paddingBottom: 10}}>
                  Georeferencia
                </Title>
                <Button onPress={this.showModal}>
                  Mostrar Mapa
                </Button>
              </CardSection>
              {this.renderModalAddressList(props)}

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
}

export default StoreForm;
