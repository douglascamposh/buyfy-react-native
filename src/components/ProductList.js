import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, FlatList } from 'react-native';
import { productsFetch } from '../actions';
import ProductListItem from './ProductListItem';

class ProductList extends Component {
  componentWillMount() {
    this.props.productsFetch();
  }

  componentWillReceiveProps(nextProps) {
  }

  productDetailOnClick = (product) => {
    this.props.navigation.navigate('productDetail', { product });
  }

  renderItem = ({item: product}) => {
    return <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick}/>
  }

  render() {
    return (
      <FlatList
        enableEmptySections
        renderItem={this.renderItem}
        data={this.props.products}
        keyExtractor={({uid}) => String(uid)}
      />
    );
  }
}

const mapStateToProps = state => {
  const products = _.map(state.products, (val, uid) => {
    return {...val, uid};
  });
  return {products};
};

export default connect(mapStateToProps, {productsFetch})(ProductList);
