import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeFetchById, storeUpdateFields } from '../../actions';
import ScheduleWeek from './ScheduleWeek';

class StoreScheduleForm extends Component {

  componentDidMount() {
    const { navigation } = this.props;
    const storeId = navigation.getParam('storeId', {});
    this.props.storeFetchById(storeId);
  }

  saveSchedule = (values) => {
    const store = { ...this.props.store };
    store.schedule = values;
    this.props.storeUpdateFields({ ...store })
    this.props.navigation.navigate('productAdminList', { store });
  }

  render() {
    const schedule = { ...this.props.store.schedule }
    return (<ScheduleWeek schedule={schedule} saveSchedule={this.saveSchedule} />);
  }
}

const mapStateToProps = state => {
  const store = { ...state.store };
  return { store };
};

export default connect(mapStateToProps, { storeFetchById, storeUpdateFields })(StoreScheduleForm);
