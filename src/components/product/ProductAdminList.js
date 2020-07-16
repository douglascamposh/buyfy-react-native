import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView, SafeAreaView } from 'react-native';
import { productsFetchByStoreId, deleteProduct, storeUpdateFields } from '../../actions';
import ProductListItem from './ProductListItem';
import { Card, AsyncTile, Content, AppleStyleSwipeableRow, RightActions, Button, Title } from '../common';
import { Colors, Size } from '../../constants/Styles';
import { Overlay, Icon } from 'react-native-elements';

import ScheduleWeek from './ScheduleWeek';

class ProductAdminList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    this.props.productsFetchByStoreId(store.uid);
  }

  productDetailOnClick = (product) => {
    this.props.navigation.navigate('productDetail', { product });
  }

  productEditOnClick = (product) => {
    this.props.navigation.navigate('editProduct', { product });
  }

  productDeleteOnClick = (product) => {
    this.props.deleteProduct(product.uid);
  }

  renderRightActions = (progress, item, close) => {
    const buttonActions = [
      {
        onPress: () => { close(); this.productEditOnClick(item); }, color: Colors.primaryBlue, item: item,
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
        onPress: () => { this.productDeleteOnClick(item); close(); }, color: Colors.primaryRed, item: item,
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

  showScheduleOnClick = () => {
    this.setState({ isVisible: true });
  }

  saveSchedule = (values) => {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    store.schedule = values;
    this.props.storeUpdateFields({...store})
    this.setState({isVisible: false});
  }

  renderModalSchedule(store) {
    return (
      <Overlay
        isVisible={this.state.isVisible}
        onBackdropPress={() => this.setState({ isVisible: false })}
      >
        <ScrollView>
          <Title>
            Horario de Atención
          </Title>
          <ScheduleWeek
            schedule={{ ...store.schedule }}
            saveSchedule={this.saveSchedule}
          />
        </ScrollView>
      </Overlay>
    );
  }

  render() {
    const { navigation } = this.props;
    const store = navigation.getParam('store', {});
    const imageRoute = store.imageName ? `images/${store.imageName}` : 'regalo.jpg';
    return (
      <SafeAreaView style={styles.container}>    
        <FlatList
          ListHeaderComponent={
          <>
            <Card>
              <AsyncTile image={imageRoute} title={store.name}>
                <Content>
                  Tiempo de entrega aproximado {store.deliveryTime} min.
                </Content>
                <Content>
                  Costo de envío {store.shippingCost} Bs. - Pedido mínimo {store.minimumCost} Bs.
                </Content>
              </AsyncTile>
            </Card>
            <Card>
              {this.renderModalSchedule(store)}
            </Card>
            <Card>
              <Title>Horario de Atención</Title>
              <Button onPress={this.showScheduleOnClick}>Configurar Horario</Button>
            </Card>
          </>
          }
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.products}
          keyExtractor={({ uid }) => String(uid)} deleteProduct
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
  }
}

const mapStateToProps = state => {
  const products = _.map(state.products, (val, uid) => {
    return { ...val, uid };
  });
  const store = { ...state.store};

  return { products, store };
};

export default connect(mapStateToProps, { productsFetchByStoreId, deleteProduct, storeUpdateFields })(ProductAdminList);
