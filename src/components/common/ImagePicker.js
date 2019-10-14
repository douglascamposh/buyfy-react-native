import React from 'react';
import {View, Image} from 'react-native';
import { Button } from './Button'

const ImagePicker = (props) => {
  const {image} = props;
  return (
    <View>
      <Button onPress={props.onPress}>
        {props.children}
      </Button>
      {image && <Image source={{uri: image}} style={{width: 50, height: 50}}/>}
    </View>
  );
}

export {ImagePicker};
