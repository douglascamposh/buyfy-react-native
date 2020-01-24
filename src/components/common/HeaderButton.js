import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Padding } from '../../constants/Styles';
import { Content } from './Content';

const HeaderButton = ({ headerText, icon, onPress }) => {
  const { viewStyle } = styles;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={viewStyle}>
        <Icon
          name={icon}
          type='ionicon'
          color='#517fa4'
        />
        <Content>{headerText}</Content>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  viewStyle: {
    paddingLeft: Padding.headerLeft,
    paddingRight: Padding.headerRight
  }
};

export { HeaderButton };
