import React from 'react';
import { Text } from 'react-native';
import { Size, Colors } from '../../constants/Styles';

const Content = (props) => {

  const styles = {
    contentStyle: {
      marginTop: 10,
      fontSize: Size.descriptionCard,
      // fontWeight: FontWeight.descriptionCard,
      color: Colors.secondaryText,
      fontFamily: 'San-Francisco-Light'
    }
  };

  const { contentStyle } = styles;
  return (
    <Text numberOfLines={props.numberOfLines} style={[contentStyle, props.style]}>{props.children}</Text>
  );
};

export { Content };