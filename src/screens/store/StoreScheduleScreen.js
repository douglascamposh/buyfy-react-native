import React, { Component } from 'react';
import StoreScheduleForm from '../../components/product/StoreScheduleForm';

class StoreScheduleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Horario de Atención',
      headerTruncatedBackTitle: 'Atras'
    }
  }

  render() {
    const storeId = this.props.navigation.getParam('storeId', {});
    return <StoreScheduleForm navigation={this.props.navigation} storeId={storeId}/>;
  }
}

export default StoreScheduleScreen;
