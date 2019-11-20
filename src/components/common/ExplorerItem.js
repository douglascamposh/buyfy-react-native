import React from 'react';
import { View, Text } from 'react-native';
import { AsyncImage } from './AsyncImage';

const ExplorerItem = (props) => {
  const { boxStyle, imageStyle, labelStyle } = styles;
  const imageRoute = props.image ? `images/${props.image}` : 'regalo.jpg';
  return (
    <View style={ boxStyle }>
      <View style={{ flex: 2 }}>
        <AsyncImage
          image={imageRoute}
          style={ imageStyle }
        />
      </View>
      <View style={ labelStyle }>
        <Text>{props.label}</Text>
      </View>
    </View>
  );
};

const styles = {
  boxStyle: {
    height: 130,
    width: 130,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: '#dddddd'
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  labelStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10
  }
};

export {ExplorerItem};