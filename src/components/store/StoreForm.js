import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeUpdateForm } from '../../actions';
import { View } from 'react-native';
import { CardSection, Input, ImagePicker } from '../common';
import * as ExpoImagePicker from 'expo-image-picker';

class StoreForm extends Component {

  onChooseImagePress = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync();
    if(!result.cancelled) {
      this.props.storeUpdateForm({prop: 'image', value: result.uri});
    }
  }

  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Nombre"
            placeholder="Nombre de la tienda"
            value={this.props.name}
            onChangeText={value => this.props.storeUpdateForm({prop: 'name', value})}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Descripcion"
            placeholder="Descripcion de la tienda"
            value={this.props.description}
            onChangeText={value => this.props.storeUpdateForm({prop: 'description', value})}
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
  const { name, description, image } = state.storeForm;
  return { name, description, image };
}

export default connect(mapStateToProps, {storeUpdateForm})(StoreForm);
