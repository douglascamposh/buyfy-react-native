import React from 'react';
import { Title } from './Title';
import { View, ScrollView } from 'react-native';
import { ExplorerItem } from './ExplorerItem';

const Explorer = (props) => {

  const { titleStyle, containerStyle } = styles;
  return (
    <ScrollView
      scrollEventThrottle={16}
    >
      <View>
        <Title style={titleStyle}>
          Productos Recomendados
        </Title>
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
      {items.map( item => <ExplorerItem
        key={item.uid}
        title={item.name}
        description={item.description}
        footer={`Bs. ${item.price}`}
        image={item.imageName}
        uri={item.imageUri}
        containerImage={styles.containerImage}
        containerLabel={styles.containerLabel}
        />)
      }
    </ScrollView>
  )
}

const styles = {
  titleStyle: {
    fontSize: 24,
    fontFamily: 'SanFrancisco-Bold',
    paddingLeft: 10
  },
  containerStyle: {
    height:220,
    marginTop: 20,
    marginBottom: 20
  },
  containerImage: {
    height: '60%'
  },
  containerLabel: {
    height: '40%'
  },
};

export {Explorer};