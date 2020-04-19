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
    fontSize: Size.titleCard,
    marginTop: 10,
    fontWeight: FontWeight.titleCard,
    color: Colors.primaryText
  }
};

export { Title };