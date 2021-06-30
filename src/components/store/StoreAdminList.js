import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { AppleStyleSwipeableRow, RightActions, Spinner, CardSection, Title, Content, Button} from '../common';
import { FlatList, RefreshControl, View, SafeAreaView } from 'react-native';
import { storesByUserIdFetch, storeUpdateFields, disableEnableStore } from '../../actions';
import { Colors, Size } from '../../constants/Styles';
import { Icon, Overlay } from 'react-native-elements';
import StoreListItem from './StoreListItem';

class StoreAdminList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      currentStore: null,
    }
  }
  
  componentDidMount() {
    this.props.storesByUserIdFetch();
  }

  componentDidUpdate(prevProps) { 
    if(this.props.stores.length !== prevProps.stores.length){
      this.props.storesByUserIdFetch();
    }
  }

  storeOnClick = (store) => {
    this.props.navigation.navigate('productAdminList', { storeId: store.uid, name: store.name, categoryId: store.categoryId });
  }

  storeEditOnClick = (store) => {
    this.props.navigation.navigate('editStore', { store });
  }

  storeDeleteOnClick = (store) => {
    this.props.disableEnableStore({ ...store, deleted: !store.deleted });
    this.setState({currentStore: null, isVisible: false});
  }

  renderModal() { 
    const { currentStore } = this.state;
    return currentStore &&
    <Overlay
      isVisible={this.state.isVisible}
      onBackdropPress={() => this.setState({ isVisible: false})}
      height="30%"
    >
      <View style={styles.modalStyle}>
        { currentStore.deleted ? <Title style={[styles.titleStyle, styles.centerContent]}>¿Esta seguro que desea habilitar el restaurant?</Title>:
          <Title style={[styles.titleStyle, styles.centerContent]}>¿Esta seguro que desea desabilitar el restaurant?</Title> }
        <CardSection style={styles.CardSectionStyle}>
          <Button style={styles.modalButtonStyle} onPress={()=> this.setState({isVisible: false})} >No</Button>
          <Button style={styles.modalButtonStyle} onPress={() => this.storeDeleteOnClick(currentStore)}>Sí, continuar</Button>
        </CardSection>
      </View>
    </Overlay>
  }

  renderRightActions = (progress, item, close) => {
    const buttonActions = [
      {
        onPress: () => { close(); this.storeEditOnClick(item); }, color: Colors.primaryBlue, item: item,
        icon: (
          <Icon
            name='ios-create'
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
          />
        )
      },
      {
        onPress: () => { this.setState({currentStore: item, isVisible: true}); close(); }, color: Colors.primaryRed, item: item,
        icon: (
          <Icon
            name={Boolean(item.deleted) ? 'arrow-undo-sharp' : 'ios-trash'}
            type='ionicon'
            size={Size.iconButton}
            color={Colors.primaryTextInverse}
          />
        )
      }
    ];
    return (
      <RightActions progress={progress} buttonActions={buttonActions} />
    )
  };

  renderItem = ({ item: store }) => {
    return (
      <AppleStyleSwipeableRow
        renderRightActions={this.renderRightActions}
        item={store}>
        <StoreListItem store={store} storeOnClick={this.storeOnClick} />
      </AppleStyleSwipeableRow>
    );
  }

  onRefresh() {
    this.props.storesByUserIdFetch();
  }

  render() {
    if(this.props.pending){
      return <Spinner />
    }
    return (
      <SafeAreaView>
        {this.renderModal()}
        <FlatList
          enableEmptySections
          renderItem={this.renderItem}
          data={this.props.stores}
          keyExtractor={({ uid }) => String(uid)}
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
  const stores = _.map(state.adminStores.data, (val) => {
    return { ...val };
  });
  const { pending } = state.adminStores;
  return { stores, pending };
};

export default connect(mapStateToProps, { storesByUserIdFetch, storeUpdateFields, disableEnableStore })(StoreAdminList);
