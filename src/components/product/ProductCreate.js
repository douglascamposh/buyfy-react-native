import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productCreate, productUpdate } from '../../actions';
import { Card } from '../common';
import ProductForm from './ProductForm';

class ProductCreate extends Component {
  
  onButtonPress = ({ name, description, price, image = '', imageName = '', storeId, uid }) => {
    !uid ? this.props.productCreate({ name, description, price, image, storeId }) :
    this.props.productUpdate({ name, description, price, image, imageName, storeId, uid });
    this.props.navigateTo();
  }

  render() {
    const product = this.props.product ? this.props.product : { ...this.props, storeId: this.props.storeId };
    return (
      <Card>
        <ProductForm product={product} saveProduct={this.onButtonPress}/>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const product = state.productForm;
  return { ...product };
}

export default connect(mapStateToProps, { productCreate, productUpdate })(ProductCreate);