import React, { Component } from 'react';
import ScheduleWeek from '../../components/product/ScheduleWeek';

class StoreScheduleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Horario de Atención',
      headerTruncatedBackTitle: 'Atras'
    }
  }

  render() {
    const schedule = this.props.navigation.getParam('schedule', {});
    const saveSchedule = this.props.navigation.getParam('saveSchedule', () => {});
    return <ScheduleWeek navigation={this.props.navigation} schedule={schedule} saveSchedule={saveSchedule}/>;
  }
}

export default StoreScheduleScreen;
