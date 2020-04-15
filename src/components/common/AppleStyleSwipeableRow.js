import React, { Component } from 'react';
import { Animated, Text, View, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Size } from '../../constants/Styles';

class AppleStyleSwipeableRow extends Component {

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };

  

  render() {
    const { renderRightActions = null, renderLeftActions = null, item, children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={renderLeftActions ? (progress) => renderLeftActions(progress, item) : renderLeftActions}
        renderRightActions={renderRightActions ? (progress) => renderRightActions(progress, item) : renderRightActions}
        close={this.close}
      >
        {children}
      </Swipeable>
    );
  }
}

const LeftActions = ({ progress, buttonActions}) => {
  const widthButtonSwipe = 64;
  const width = buttonActions.length * widthButtonSwipe;
  const buttons = [];
  buttonActions.forEach((element, index) => {
    buttons.push(
      <RightAction
        key={index}
        text={element.title}
        color={element.color}
        x={((index + 1) * widthButtonSwipe)}
        progress={progress}
        onPress={() => element.onPress(element.item)}
      />
    );
  });
  return (
    <View style={{ width: width, flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse' }}>
      {buttons}
    </View>
  );
};

const RightActions = ({progress, buttonActions}) => {
  const widthButtonSwipe = 64;
  const width = buttonActions.length * widthButtonSwipe;
  const buttons = [];
  buttonActions.forEach((element, index) => {
    buttons.push(
      <RightAction
        key={index}
        text={element.title}
        color={element.color}
        icon={element.icon}
        x={((index + 1) * widthButtonSwipe)}
        progress={progress}
        onPress={() => element.onPress(element.item)}
      />
    );
  });
  return (
    <View style={{ width: width, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
      {buttons}
    </View>
  );
};

const RightAction = ({ text, icon, color, x, progress, onPress }) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
      <RectButton
        style={[styles.rightAction, { backgroundColor: color }]}
        onPress={onPress}>
          {icon}
          <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const styles = {
  actionText: {
    color: 'white',
    fontSize: Size.button,
    backgroundColor: 'transparent',
  },
  rightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
};

export { AppleStyleSwipeableRow, RightActions, LeftActions };