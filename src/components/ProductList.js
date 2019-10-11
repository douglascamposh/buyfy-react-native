import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { productsFetch } from '../actions';
import ProductListItem from './ProductListItem';

class ProductList extends Component {
  componentWillMount() {
    console.log("componentWillMount", this.props);
    this.props.productsFetch();
    this.createDatasource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    this.createDatasource(nextProps);
  }

  createDatasource({ products }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(products);
  }

  renderRow(product) {
    return <ProductListItem product={product}/>
  }

  render() {
    return (
      <ListView
        enableEmptySections
        renderRow={this.renderRow}
        dataSource={this.dataSource}
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
