import React from 'react';
import { Text } from 'react-native';
import { FontWeight, Size, Colors } from '../../constants/Styles';

const Content = (props) => {

  const styles = {
    contentStyle: {
      fontSize: Size.descriptionCard,
      paddingLeft: 15,
      marginTop: 10,
      fontWeight: FontWeight.descriptionCard,
      color: Colors.secondaryText
    }
  };

  const { contentStyle } = styles;
  return (
    <Text style={[contentStyle, props.style]}>{props.children}</Text>
  );
};

export { Content };