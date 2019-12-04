import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 10,
    borderColor: '#f2f2f2',
    elevation: 1,
    paddingTop: 5,
    flex: 1
  }
};

export { Card };
