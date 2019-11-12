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

  storeOnClick = (store) => {
    this.props.navigation.navigate('productList', { store });
  }

  renderItem = ({item: store}) => {
    return <StoreListItem store={store} storeOnClick={this.storeOnClick} />
  }

  render() {
    return (
      <FlatList
        enableEmptySections
        renderItem={this.renderItem}
        data={this.props.stores}
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
