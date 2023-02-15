import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import { Colors } from '../../constants/Styles'

const Spinner = ({size}) => {
    return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator color={Colors.headerBlue} size={size || 'large'} />
    </View>
    );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
export {Spinner};
