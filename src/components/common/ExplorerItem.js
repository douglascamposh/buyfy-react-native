import React from 'react';
import { View } from 'react-native';
import { AsyncImage } from './AsyncImage';
import { Title } from './Title';
import { Content } from './Content';

const ExplorerItem = (props) => {
  const { containerStyle, containerImage, imageStyle, containerLabel, titleStyle, descriptionStyle } = styles;
  const imageRoute = props.image ? `images/${props.image}` : 'regalo.jpg';
  return (
    <View style={ containerStyle }>
      <View style={[containerImage, props.containerImage]}>
        <AsyncImage
          image={imageRoute}
          style={ imageStyle }
        />
      </View>
      <View style={[containerLabel, props.containerLabel]}>
        <Title style={titleStyle}>{props.title}</Title>
        <Content numberOfLines={2} style={descriptionStyle}>{props.description}</Content>
        <Title style={titleStyle}>{props.footer}</Title>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    width: 220,
    marginLeft: 20,
  },
  containerImage: {
    height: '75%'
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 5,
    overflow: 'hidden'
  },
  containerLabel: {
    height: '25%',
    paddingLeft: 10,
    marginTop: 10
  },
  titleStyle: {
    marginTop: 0,
  },
  descriptionStyle: {
    marginTop: 0
  }
};

export {ExplorerItem};