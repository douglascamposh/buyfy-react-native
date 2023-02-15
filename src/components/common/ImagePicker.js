import React from 'react';
import {View, Image} from 'react-native';
import { Button } from './Button'

const ImagePicker = (props) => {
  const { image } = props;
  const { containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Button onPress={props.onPress}>
        {props.children}
      </Button>
      {Boolean(image) && <Image source={{uri: image}} style={{width: 50, height: 50}}/>}
    </View>
  );
}

const styles = {
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export {ImagePicker};
