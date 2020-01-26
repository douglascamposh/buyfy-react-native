import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Padding, Size, Colors } from '../../constants/Styles';

const HeaderButton = ({ icon, onPress }) => {
  const { viewStyle } = styles;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={viewStyle}>
        {icon && <Icon
          name={icon}
          type='ionicon'
          color={Colors.headerBlue}
          size={Size.iconHeader}
        />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  viewStyle: {
    paddingLeft: Padding.headerLeft,
    paddingRight: Padding.headerRight,
    paddingTop: Padding.headerTop
  }
};

export { HeaderButton };
