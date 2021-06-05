import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, SafeAreaView, RefreshControl,  View } from 'react-native';
import { productsFetchByStoreId, deleteProduct, storeFetchById } from '../../actions';
import ProductListItem from './ProductListItem';
import { Card, AsyncTile, Content, AppleStyleSwipeableRow, RightActions, Button, Title, Spinner, CardSection } from '../common';
import { Colors, Size } from '../../constants/Styles';
import { Icon, Overlay } from 'react-native-elements';


class ProductAdminList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentProduct: null
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const storeId = navigation.getParam('storeId', {});
    this.props.storeFetchById(storeId)
    this.props.productsFetchByStoreId(storeId);
  }

  componentDidUpdate(prevProps) { 
    const { navigation } = this.props;
    const storeId = navigation.getParam('storeId', {});
    if(this.props.products.length !== prevProps.products.length){
      this.props.productsFetchByStoreId(storeId);
    }
  }

  productDetailOnClick = (product) => {
    this.props.navigation.navigate('productDetail', { product });
  }

  productEditOnClick = (product) => {
    this.props.navigation.navigate('editProduct', { product });
  }

  productDeleteOnClick = (productId) => {
    this.props.deleteProduct(productId);
    this.setState({isVisible: false})
  }

  renderModal() { 
    const { currentProduct } = this.state;
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: true})}
        height="30%"
      >
        <View style={styles.modalStyle}>
          <Title style={[styles.titleStyle, styles.centerContent]}>¿Esta seguro que desea eliminar el producto?</Title>
          <Content style={styles.centerContent}>El producto se borrará permanentemente</Content>
          <CardSection style={styles.CardSectionStyle}>
            <Button style={styles.modalButtonStyle} onPress={()=> this.setState({isVisible: false})} >No</Button>
            <Button style={styles.modalButtonStyle} onPress={() => this.productDeleteOnClick(currentProduct.uid)}>Sí, continuar</Button>
          </CardSection>
        </View>
      </Overlay>
    );
  }

  renderRightActions = (progress, item, close) => {
    const buttonActions = [
      {
        onPress: () => { close(); this.productEditOnClick(item) }, color: Colors.primaryBlue, item: item,
        icon: (
          <Icon
            name='ios-create'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
            iconStyle={styles.iconStyle}
          />
        )
      },
      {
        onPress: () => { this.setState({currentProduct: item, isVisible: true}); close(); }, color: Colors.primaryRed, item: item,
        icon: (
          <Icon
            name='ios-trash'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
            iconStyle={styles.iconStyle}
          />
        )
      }
    ];
    return (
      <RightActions progress={progress} buttonActions={buttonActions} />
    )
  };

  renderItem = ({ item: product }) => {
    return (
      <AppleStyleSwipeableRow
        renderRightActions={this.renderRightActions}
        item={product}>
        <ProductListItem product={product} productDetailOnClick={this.productDetailOnClick} />
      </AppleStyleSwipeableRow>
    );
  }

  viewOrder() {
    const { storeId } = _.last(this.props.products)
    this.props.navigation.navigate('orderList', { storeId });
  }

  navigateToScheduleForm = () => {
    const storeId = this.props.navigation.getParam('storeId', {});
    this.props.navigation.navigate('editScheduleStoreScreen', { storeId });
  }

  onRefresh() {
    const { navigation } = this.props;
    const storeId = navigation.getParam('storeId', {});  
    this.props.productsFetchByStoreId(storeId);
  }

  render() {
    const { store } = this.props;
    if(this.props.pending){
      return(<Spinner />)
    }

    return (
      <SafeAreaView style={styles.container}>   
      {this.renderModal()} 
        <FlatList
          ListHeaderComponent={
          <>
            <Card>
                <AsyncTile uri={store.imageUri} title={store.name}>
                <Content>
                  Tiempo de entrega aproximado {store.deliveryTime} min.
                </Content>
                <Content>
                  Costo de envío {store.shippingCost} Bs. - Pedido mínimo {store.minimumCost} Bs.
                </Content>
              </AsyncTile>
            </Card>
            <Card>
              <Title>Horario de Atención</Title>
              <Button onPress={this.navigateToScheduleForm}>Configurar Horario</Button>
            </Card>
          </>
          }
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.products}
          keyExtractor={({ uid }) => String(uid)}
          deleteProduct
          refreshControl={
            <RefreshControl
              refreshing={this.props.pending}
              onRefresh={()=> this.onRefresh()}
              colors={[Colors.headerBlue]}
              tintColor={Colors.headerBlue}
            />
          }
        />
      </SafeAreaView>
    );
  }
}
const styles = {
  containerProduct: {
    height: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  container: {
    flex: 1
  },
  centerContent: {
    textAlign: 'center',
  },
  titleStyle: {
    fontSize: 20,
    marginTop: 10,
    color: Colors.primaryText
  },
  modalStyle: {
    justifyContent: 'center',
    flex: 1
  },
  modalButtonStyle: {
    color: Colors.primaryRed,
  },
  CardSectionStyle: {
    borderBottomWidth: 0
  }
}

const mapStateToProps = state => {
  const store = {...state.store}
  const products = _.map(state.products.data, (val) => {
    return { ...val };
  });
  const { pending } = state.products;
  return { products, store, pending };
};

export default connect(mapStateToProps, { productsFetchByStoreId, deleteProduct, storeFetchById })(ProductAdminList);
