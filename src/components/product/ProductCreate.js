import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productCreate, productUpdate } from '../../actions';
import { StackActions, NavigationActions } from 'react-navigation';
import { Card } from '../common';
import ProductForm from './ProductForm';

class ProductCreate extends Component {
  
  onButtonPress = ({ name, description, price, image, imageName, storeId, uid }) => {
    !uid ? this.props.productCreate({ name, description, price, image, storeId }) :
      this.props.productUpdate({ name, description, price, image, imageName, storeId, uid });
    this.props.navigateTo('productAdminList', {store:{uid:storeId}});
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'productAdminList' })],
    });
    this.props.navigation.dispatch(resetAction);
  
  }

  render() {
    const { name, description, price, image, imageName, storeId, uid } = this.props.product ? this.props.product : this.props;
    return (
      <Card>
        <ProductForm product={{ name, description, price, image, imageName, storeId, uid }} saveProduct={this.onButtonPress}/>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, description, price, image, imageName, uid} = state.productForm;
  return { name, description, price, image, imageName, uid};
}

export default connect(mapStateToProps, { productCreate, productUpdate })(ProductCreate);
