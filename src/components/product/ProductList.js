import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, FlatList } from 'react-native';
import { productsFetch, productsFetchByStoreId } from '../../actions';
import ProductListItem from './ProductListItem';
import { Explorer, Card } from '../common';

class ProductList extends Component {
  componentWillMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.productsFetchByStoreId(store.uid);
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
      <ScrollView>
        <Card>
          <Explorer data={this.props.products}/>
        </Card>
        <FlatList
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.products}
          keyExtractor={({uid}) => String(uid)}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const products = _.map(state.products, (val, uid) => {
    return {...val, uid};
  });
  return {products};
};

export default connect(mapStateToProps, {productsFetch, productsFetchByStoreId})(ProductList);
