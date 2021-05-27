import React from 'react';
import { View } from 'react-native';
import { Colors, Padding } from '../../constants/Styles';

const Card = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 10,
    borderColor: Colors.borderPrimary,
    elevation: 1,
    paddingTop: Padding.card,
    paddingBotom: Padding.card,
    flex: 1,
    backgroundColor: Colors.backgroundPrimary
  }
};

export { Card };
