import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, FlatList } from 'react-native';
import { productsFetch } from '../actions';
import ProductListItem from './ProductListItem';

class ProductList extends Component {
  componentWillMount() {
    this.props.productsFetch();
    this.createDatasource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDatasource(nextProps);
  }

  createDatasource({ products }) {
    // const ds = new FlatList.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // });
    // this.dataSource = ds.cloneWithRows(products);
  }

  renderItem({item: product}) {
    return <ProductListItem product={product}/>
  }

  render() {
    return (
      <FlatList
        enableEmptySections
        renderItem={this.renderItem}
        data={this.props.products}
        keyExtractor={({index}) => String(index)}
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
