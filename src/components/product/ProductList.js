import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, SafeAreaView } from 'react-native';
import { productsFetchByStoreId, orderFetchByUserIdAndStoreIdAndState, deleteOrders, storeFetchById } from '../../actions';
import ProductListItem from './ProductListItem';
import { Explorer, Card, FloatButton, AsyncTile, Content, Title, CardSection, Button, Spinner } from '../common';
import { orderStates } from './../../constants/Enum';
import { Colors } from '../../constants/Styles';
import { scheduleMessage } from '../../utils/Utils';
import { Overlay, Icon } from 'react-native-elements';
import { isOpen } from '../../utils/Utils';
class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      isBackVisible: false
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    Promise.all([
      this.props.storeFetchById(store.uid),
      this.props.productsFetchByStoreId(store.uid),
      this.props.orderFetchByUserIdAndStoreIdAndState(store.uid, orderStates.draft)
    ]).then(() => {
      if (Boolean(this.props.orders.length)) { //Todo: research if we can add this if sentence after to get orders
        navigation.setParams({ back: () => this.setState({ isBackVisible: true }) })
      } else {
        navigation.setParams({ back: () => navigation.goBack() });
      }
    });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.orders !== this.props.orders) {
      const { navigation } = this.props;
      if (Boolean(this.props.orders.length)) {
        navigation.setParams({ back: () => this.setState({ isBackVisible: true }) })
      } else {
        navigation.setParams({ back: () => navigation.goBack() });
      }
    }
  }

  productDetailOnClick = (product) => {
    const store = this.props.navigation.getParam('store', {});
    if(isOpen(store.schedule)) {
      this.props.navigation.navigate('productDetail', { product });
    } else {
      this.setState({ isVisible: true });
      setTimeout(() => this.setState({ isVisible: false }), 1600);
    }
  }

  renderItem = ({item: product}) => {
    return (
      <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick} />
    );
  }

  renderModalBack() {
    return (
      <Overlay
        isVisible={this.state.isBackVisible}
        onBackdropPress={() => this.setState({ isBackVisible: false })}
        height="50%"
      >
        <View style={styles.modalStyle}>
          <Icon
            name='ios-cart'
            type='ionicon'
            color={Colors.primaryRed}
            size={100}
          />
          <Title style={[styles.titleStyle, styles.centerContent]}>¿Quieres salir?</Title>
          <Content style={styles.centerContent}>Al salir, se elimira tu pedido</Content>
          <Content style={styles.centerContent}>¿Quieres continuar?</Content>
          <CardSection style={styles.CardSectionStyle}>
            <Button style={styles.modalButtonStyle} onPress={() => this.setState({ isBackVisible: false })} >No</Button>
            <Button style={styles.modalButtonStyle} onPress={() => {
              deleteOrders(this.props.orders)
                .then(() => console.info(`Orders removed`))
                .catch(error => console.warn("Error at remove the Order", error));
              this.props.navigation.goBack();
            }}>Sí, salir</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }

  renderModal() {
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
        height="25%"
      >
        <View style={styles.modalStyle}>
          <Title style={[styles.titleStyle, styles.centerContent]}>La tienda esta cerrada</Title>
        </View>
      </Overlay>
    );
  }

  viewOrder() {
    const { storeId } = _.last(this.props.products)
      this.props.navigation.navigate('orderList', { storeId });
  }


  render() {
    const { store } = this.props;
    if(store.pending){
      return(<Spinner />)
    }
    const imageRoute = store.imageName ? `images/${store.imageName}` : 'regalo.jpg';
    const scheduletext = scheduleMessage(store.schedule);
    return (
      <SafeAreaView style={styles.container}>
        <View style={this.props.orders.length ? styles.containerProduct : styles.container}>
            <FlatList
            ListHeaderComponent={
              <> 
                <Card>
                  <AsyncTile
                    imageContainerStyle={Boolean(scheduletext) ? styles.disableTileStyle : null}
                    image={imageRoute}
                    title={store.name}
                  >
                    <Content>
                      Tiempo de entrega aproximado {store.deliveryTime} min.
                    </Content>
                    <Content>
                      Costo de envío {store.shippingCost} Bs. - Pedido mínimo {store.minimumCost} Bs.
                    </Content>
                    {Boolean(scheduletext) && <Title style={styles.closedStyle}>{scheduletext}</Title>}
                  </AsyncTile>
                </Card>
                <Card>
                  <Explorer data={this.props.products} />
                </Card>
              </>
              }
              enableEmptySections
              renderItem={this.renderItem}
              data={this.props.products}
              keyExtractor={({ uid }) => String(uid)}
            withPointer={false}
            />
          {this.renderModal()}
          {this.renderModalBack()}
        </View>
      {Boolean(this.props.orders.length) && (
        <FloatButton text={'Ver mi pedido'} onPress={this.viewOrder.bind(this)} />)}
      </SafeAreaView>
    );
  }
}

const styles = {
  containerProduct: {
    height: '90%'
  },
  container: {
    flex: 1
  },
  closedStyle: {
    color: Colors.primaryRed,
    marginTop: 5
  },
  disableTileStyle: {
    opacity: 0.5
  },
  modalStyle: {
    justifyContent: 'center',
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
  modalButtonStyle: {
    color: Colors.primaryRed
  },
  CardSectionStyle: {
    borderBottomWidth: 0
  }
}

const mapStateToProps = state => {
  const products = _.map(state.products.data, (val) => {
    return { ...val };
  }); 
  const orders = _.map(state.orders.data, (val) => {
    return { ...val };
  });

  const store = { ...state.store };
  const { pending } = state.orders;

  return { products, orders, store, pending };
};

export default connect(mapStateToProps, { productsFetchByStoreId, orderFetchByUserIdAndStoreIdAndState, storeFetchById })(ProductList);
