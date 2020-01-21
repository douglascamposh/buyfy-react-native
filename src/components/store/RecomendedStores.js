import React from 'react';
import { View } from 'react-native';
import { Carrousel, ExplorerItem } from '../common';

const renderCarrouselItem = (item) => {
  return (
    <ExplorerItem
      title={item.name}
      description={`${item.deliveryTime}-${item.deliveryTime + 15} min | Bs. ${item.deliveryPrice}`}
      image={item.imageName}
    />
  );
}

const RecomendedStores = ({ stores }) => {
  return (
    <View>
      {Boolean(stores.length) && (
        <Carrousel
          title={'Nuestra Recomendación'}
          data={stores}
          renderItem={renderCarrouselItem}
          keyExtractor={({ uid }) => String(uid)}
        />
      )}
    </View>
  );
};


export default RecomendedStores;
