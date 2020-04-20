import React from 'react';
import { Text } from 'react-native';
import { FontWeight, Size, Colors } from '../../constants/Styles';

const Title = (props) => {
  const { titleStyle } = styles;
  return (
    <Text style={[titleStyle, props.style]}>{props.children}</Text>
  );
};

const styles = {
  titleStyle: {
    marginTop: 10,
    fontSize: Size.titleCard,
    // fontWeight: FontWeight.titleCard,
    color: Colors.primaryText,
    fontFamily: 'San-Francisco-Medium'
  }
};

export { Title };