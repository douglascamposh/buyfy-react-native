import React from 'react';
import { View } from 'react-native';
import { AsyncImage } from './AsyncImage';
import { Title } from './Title';
import { Content } from './Content';

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
        <Title style={titleStyle}>{props.title}</Title>
        <Content numberOfLines={2} style={descriptionStyle}>{props.description}</Content>
        <Title style={titleStyle}>{props.footer}</Title>
      </View>
    </View>
  );
};

const styles = {
  boxStyle: {
    height: 220,
    width: 220,
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
    paddingLeft: 0,
    marginTop: 0,
  },
  descriptionStyle: {
    paddingLeft: 0,
    marginTop: 0
  }
};

export {ExplorerItem};