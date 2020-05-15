import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, ImagePicker, TextInput, Button } from '../common';
import * as ExpoImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup';

const ProductSchema = yup.object({
  name: yup.string()
    .label('Nombre')
    .required('Debes ingresar el ${label}.')
    .min(3)
    .trim(),
  description: yup.string()
    .label('Descripcion')
    .required('Debes ingresar la ${label}.')
    .min(3)
    .trim('description'),
  price: yup.string()
    .label('Precio')
    .required('Debes ingresar el ${label}')
    .min(1)
});


class ProductForm extends Component {

  onChooseImagePress = async (props) => {
    let result = await ExpoImagePicker.launchImageLibraryAsync();
    if(!result.cancelled) {
      props.setFieldValue('image', result.uri);
    }
  }

  render() {
    const { product, saveProduct } = this.props;
    return (
      <View>
        <Formik
          initialValues={{ ...product }}
          validationSchema={ProductSchema}
          onSubmit={(values, actions) => {
            actions.resetForm();
            saveProduct(values);
          }}
        >
          {(props) => (
            <View>
              <CardSection>
                <TextInput
                  label="Nombre"
                  placeholder="Nombre del producto"
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  errorMessage={props.touched.name && props.errors.name}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Descripcion"
                  placeholder="Descripcion del producto"
                  value={props.values.description}
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                  errorMessage={props.touched.description && props.errors.description}
                />
              </CardSection>
              <CardSection>
                <TextInput
                  label="Precio"
                  value={String(props.values.price)}
                  onChangeText={props.handleChange('price')}
                  onBlur={props.handleBlur('price')}
                  numericvalue
                  keyboardType='numeric'
                  errorMessage={props.touched.price && props.errors.price}
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

export default ProductForm;
