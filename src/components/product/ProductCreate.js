import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productCreate, productUpdate, productsCategoryListFetch } from '../../actions';
import _ from 'lodash';
import { Card, Spinner } from '../common';
import { ScrollView, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ProductForm from './ProductForm';

class ProductCreate extends Component {

  componentDidMount() {
    this.props.productsCategoryListFetch(this.props.categoryId);
  }
  
  onButtonPress = ({ name, description, price, image = '', imageName = '', storeId, categoryId,  uid }) => {
    !uid ? this.props.productCreate({ name, description, price, image, storeId, categoryId }) :
    this.props.productUpdate({ name, description, price, image, imageName, storeId, categoryId, uid });
    this.props.navigateTo();
  }

  render() {
    if(this.props.pending){
      return <Spinner/>;
    } 
    const product = this.props.product ? 
    { ...this.props.product, categories: this.props.categories } :
    { ...this.props.newProduct, storeId: this.props.storeId, categories: this.props.categories };
    return (
      <SafeAreaView>
        <ScrollView>
          <KeyboardAwareScrollView>
            <Card>
              <ProductForm product={product} saveProduct={this.onButtonPress}/>
            </Card>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const categories = _.map(state.categoriesProduct.data, (val) => {
    return { ...val };
  });
  const newProduct = state.productForm;
  const { pending } = state.categoriesProduct;
  return { newProduct, categories, pending };
}

export default connect(mapStateToProps, { productCreate, productUpdate, productsCategoryListFetch })(ProductCreate);