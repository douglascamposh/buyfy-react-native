import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { CardSection, AsyncImage, Title, Content } from '../common';
import { Size, Colors } from '../../constants/Styles';
import { weekDays } from '../../constants/Enum';
import { isOpen } from '../../utils/Utils';

class StoreListItem extends Component {

  onRowPress() {
    this.props.storeOnClick(this.props.store);
  }

  renderScheduleMessage = (schedule={}) => {
    const currentDate = new Date();
    const day = weekDays[currentDate.getDay()];
    if(schedule[day]) {
      const openDate = new Date (schedule.openAt);
      const closeDate = new Date(schedule.closeAt);
      const dateDiff = closeDate.getDay() - openDate.getDate();
      const openHour = new Date();
      const closeHour = new Date();
      openHour.setHours(openDate.getHours(), openDate.getMinutes(), 0);
      dateDiff == 1 ? closeHour.setHours(closeDate.getHours() + 24, closeDate.getMinutes(), 0) : closeHour.setHours(closeDate.getHours(), closeDate.getMinutes(), 0);
      if (currentDate >= openHour && currentDate < closeHour) {
        return;
      } else {
        if (currentDate <= openHour) {
          const minutes = openHour.getMinutes < 10 ? ('0' + openHour.getMinutes()) : openHour.getMinutes();
          return (<Title style={styles.openStyle}>Abre a las {openHour.getHours()}:{minutes}</Title>);
        }
      }
    }
    return (<Title style={styles.closedStyle}>Cerrado por hoy </Title>);
  }

  render() {
    const { name, deliveryTime, shippingCost, deleted, schedule, logoUri } = this.props.store;
    return(
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.cardSectionStyle}>
            <View style={styles.containerLeft}>
              {Boolean(deleted) && (<Title style={styles.closedStyle}>
                Tienda Deshabilitada
              </Title>)}
              {this.renderScheduleMessage(schedule)}
              <Title style={styles.titleStyle}>
                {name}
              </Title>
              <Content numberOfLines={2} style={styles.descriptionStyle}>
                {deliveryTime} min - Bs. {shippingCost} envio
              </Content>
            </View>
            {Boolean(logoUri) && (
              <View style={Boolean(deleted) || !isOpen(schedule) ? styles.containerRigthDisable : styles.containerRigth}>
                <AsyncImage uri={logoUri} style={styles.imageStyle}></AsyncImage>
              </View>
            )}
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  closedStyle: {
    flex: 1,
    color: Colors.primaryRed,
    marginTop: 5,
    fontSize: Size.descriptionCard
  },
  openStyle: {
    flex: 1,
    color: '#ff9900',
    marginTop: 5,
    fontSize: Size.descriptionCard
  },
  titleStyle: {
    flex: 1
  },
  descriptionStyle: {
    flex: 1
  },
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  containerLeft: {
    flex: 2,
    paddingLeft: 15
  },
  containerRigth: {
    flex: 1
  },
  containerRigthDisable: {
    flex: 1,
    opacity: 0.5
  },
  imageStyle: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden'
  }
};

export default StoreListItem;
