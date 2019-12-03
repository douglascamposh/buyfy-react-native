import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './ProductForm';

class ProductCreate extends Component {
  
  onButtonPress() {
    const {name, description, price, image, storeId} = this.props;
    this.props.productCreate({name, description, price, image, storeId});
    this.props.navigateTo('productList');
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props}/>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const {name, description, price, image} = state.productForm;
  return {name, description, price, image};
}

export default connect(mapStateToProps, {productCreate})(ProductCreate);
