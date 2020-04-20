import React from 'react';
import { View, ScrollView } from 'react-native';
import { Size } from '../../constants/Styles';
import { Title } from './Title';

const Carrousel = ({ title, data, renderItem, keyExtractor, style }) => {

  const { titleStyle, containerStyle } = styles;
  return (
    <ScrollView
      scrollEventThrottle={16}
    >
      <View>
        { title && <Title style={titleStyle}>
          {title}
        </Title>
        }
        <View style={[containerStyle, style]}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {renderItems(data, renderItem, keyExtractor)}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const renderItems = (items, renderItem, keyExtractor) => {

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {items.map(item => <View key={keyExtractor(item)}>{renderItem(item)}</View>)}
    </ScrollView>
  )
}

const styles = {
  titleStyle: {
    fontSize: Size.header,
    marginLeft: 10,
    fontFamily: 'SanFrancisco-Bold'
  },
  containerStyle: {
    height: 220,
    marginTop: 20,
    marginBottom: 20
  }
};

export { Carrousel };