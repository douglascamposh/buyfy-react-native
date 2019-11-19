import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ExplorerItem } from './ExplorerItem';

const Explorer = (props) => {

  const { titleStyle, containerStyle } = styles;
  return (
    <ScrollView
      scrollEventThrottle={16}
    >
      <View>
        <Text style={titleStyle}>
          Productos Recomendados
        </Text>
        <View style={containerStyle}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {renderItems(props.data)}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const renderItems = (items) => {
  
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {items.map(item => <ExplorerItem key={item.uid} label={item.name} image={item.imageName}/>)}
    </ScrollView>
  )
}

const styles = {
  titleStyle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20
  },
  containerStyle: {
    height:130,
    marginTop: 20
  }
};

export {Explorer};