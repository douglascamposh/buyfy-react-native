import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, ImagePicker, TextInput, Button } from '../common';
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

  // Custom value formik
  onChooseImagePress = async (props) => {
    let result = await ExpoImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      props.setFieldValue('image', result.uri);
    }
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
                  label="Dirección"
                  placeholder="Ingrese la dirección"
                  value={props.values.address}
                  onChangeText={props.handleChange('address')}
                  onBlur={props.handleBlur('address')}
                  errorMessage={props.touched.address && props.errors.address}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Tiempo promedio de entrega"
                  label="Ingrese el estimado de entrega"
                  value={props.values.deliveryTime}
                  onChangeText={props.handleChange('deliveryTime')}
                  onBlur={props.handleBlur('deliveryTime')}
                  errorMessage={props.touched.deliveryTime && props.errors.deliveryTime}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Costo de envío"
                  label="Costo de envío"
                  value={props.values.shippingCost}
                  onChangeText={props.handleChange('shippingCost')}
                  onBlur={props.handleBlur('shippingCost')}
                  errorMessage={props.touched.shippingCost && props.errors.shippingCost}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Categoria"
                  label="Ingrese la Categoria"
                  value={props.values.category}
                  onChangeText={props.handleChange('category')}
                  onBlur={props.handleBlur('category')}
                  errorMessage={props.touched.category && props.errors.category}
                />
              </CardSection>
              <CardSection>
                <ImagePicker
                  onPress={() => this.onChooseImagePress(props)}
                  image={props.values.image}
                >Elegir Imagen</ImagePicker>
              </CardSection>
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
