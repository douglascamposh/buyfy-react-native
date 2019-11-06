import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { storesFetch } from '../../actions';
import StoreListItem from './StoreListItem';

class StoreList extends Component {
  componentWillMount() {
    this.props.storesFetch();
  }

  productDetailOnClick = (store) => {
    this.props.navigation.navigate('storeDetail', { store });
  }

  renderItem = ({item: store}) => {
    return <StoreListItem store={store} />
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
  const stores = _.map(state.stores, (val, uid) => {
    return {...val, uid};
  });
  return {stores};
};

export default connect(mapStateToProps, {storesFetch})(StoreList);
