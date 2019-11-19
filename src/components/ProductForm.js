import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productUpdateForm } from '../actions';
import { View } from 'react-native';
import { CardSection, Input, ImagePicker } from './common';
import * as ExpoImagePicker from 'expo-image-picker';

class ProductForm extends Component {

  onChooseImagePress = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync();
    if(!result.cancelled) {
      this.props.productUpdateForm({prop: 'image', value: result.uri});
    }
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Nombre"
            placeholder="Nombre del producto"
            value={this.props.name}
            onChangeText={value => this.props.productUpdateForm({prop: 'name', value})}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Descripcion"
            placeholder="Descripcion del producto"
            value={this.props.description}
            onChangeText={value => this.props.productUpdateForm({prop: 'description', value})}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Precio"
            placeholder="0.00 Bs."
            value={this.props.price}
            onChangeText={value => this.props.productUpdateForm({prop: 'price', value})}
          />
        </CardSection>
        <CardSection>
          <ImagePicker
            onPress={this.onChooseImagePress}
            image={this.props.image}
          >Elegir Imagen</ImagePicker>
        </CardSection>
      </View>
    );
  }
}



const mapStateToProps = (state) => {
  const {name, description, price, image} = state.productForm;
  return {name, description, price, image};
}

export default connect(mapStateToProps, {productUpdateForm})(ProductForm);
