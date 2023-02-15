import React from 'react';
import {View, StatusBar, Platform} from 'react-native';

const HeaderBar = () => {
  return (
    <View>
      {Platform.OS == "ios" ? 
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#fff"
        /> : null}
    </View>
  );
};

export { HeaderBar };
