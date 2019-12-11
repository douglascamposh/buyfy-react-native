import React from 'react';
import { View, Text } from 'react-native';
import { AsyncImage } from './AsyncImage';

const ExplorerItem = (props) => {
  const { boxStyle, imageStyle, labelStyle, titleStyle, descriptionStyle } = styles;
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
        <Text style={titleStyle}>{props.title}</Text>
        <Text numberOfLines={2} style={descriptionStyle}>{props.description}</Text>
        <Text style={titleStyle}>{props.footer}</Text>
      </View>
    </View>
  );
};

const styles = {
  boxStyle: {
    height: 130,
    width: 130,
    marginLeft: 20,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 5,
    overflow: 'hidden'
  },
  labelStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10
  },
  titleStyle: {
    fontWeight: '600',
    fontSize: 14,
  },
  descriptionStyle: {
    fontSize: 14,
    fontWeight: '300',
  }
};

export {ExplorerItem};