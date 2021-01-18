import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { storesFetch } from '../../actions';
import StoreListItem from './StoreListItem';
import InvoiceCards from '../checkout/InvoiceCards';
import { Card, CardSection, Button, Content, Title } from '../common';
import RecomendedStores from './RecomendedStores';
import { Colors } from '../../constants/Styles';
import { Overlay, Icon } from 'react-native-elements';
import { isOpen } from '../../utils/Utils';

class StoreList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentStore: null
    }
  }

  componentDidMount() {
    this.props.storesFetch();
  }

  storeOnClick = (store) => {
    isOpen(store.schedule) ? this.navigateToProduct(store) : this.setState({ isVisible: true, currentStore: store });
  }

  navigateToProduct = (store) => {
    this.props.navigation.navigate('productList', { store });
    this.setState({ isVisible: true });
  }

  invoiceCardOnClick = (invoiceId) => {
    this.props.navigation.navigate('currentOrder', { invoiceId });
  }

  renderItem = ({ item: store }) => {
    return (
      <StoreListItem store={store} storeOnClick={this.storeOnClick} />
    );
  }

  renderModal() {
    const store = {...this.state.currentStore};
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false})}
        height="50%"
      >
        <View style={styles.modalStyle}>
          <Icon
            name='md-time'
            type='ionicon'
            color={Colors.primaryRed}
            size={100}
          />
          <Title style={[styles.titleStyle, styles.centerContent]}>La tienda esta cerrada</Title>
          <Content style={styles.centerContent}>El restaurante esta cerrado por ahora</Content>
          <Content style={styles.centerContent}>Pero puedes ver el menú</Content>
          <Content style={styles.centerContent}>¿Quieres continuar?</Content>
          <CardSection style={styles.CardSectionStyle}>
            <Button style={styles.modalButtonStyle} onPress={()=> this.setState({isVisible: false})} >No</Button>
            <Button style={styles.modalButtonStyle} onPress={() => this.navigateToProduct(store)}>Sí, continuar</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }

  render() {
    return (
        <FlatList
          ListHeaderComponent={
          <>
            <Card>
              <RecomendedStores stores={this.props.stores} />
            </Card>
            <InvoiceCards
              onInvoiceCardClick={this.invoiceCardOnClick}
            />
            {this.renderModal()}  
          </>}
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.stores}
          keyExtractor={({uid}) => String(uid)}
        />
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  titleStyle: {
    fontSize: 25,
    marginTop: 10,
    color: Colors.primaryText
  },
  centerContent: {
    textAlign: 'center',
    paddingLeft: 0
  },
  modalStyle: {
    justifyContent: 'center',
    flex: 1
  },
  modalButtonStyle: {
    color: Colors.primaryRed
  },
  CardSectionStyle: {
    borderBottomWidth: 0
  }
}

const mapStateToProps = state => {
  const stores = _.map(state.stores, (val, uid) => {
    return {...val, uid};
  });

  return { stores };
};

export default connect(mapStateToProps, { storesFetch })(StoreList);
