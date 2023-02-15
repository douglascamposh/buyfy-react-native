import React from 'react';
import {View} from 'react-native';
import { Colors, Padding } from '../../constants/Styles';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: Padding.cardSection,
    backgroundColor: Colors.backgroundPrimary,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: Colors.borderPrimary,
    position: 'relative'
  }
};

export {CardSection};