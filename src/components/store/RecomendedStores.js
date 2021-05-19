import React from 'react';
import { View } from 'react-native';
import { Carrousel, ExplorerItem } from '../common';

const renderCarrouselItem = (item) => {
  return (
    <ExplorerItem
      title={item.name}
      description={`${item.deliveryTime}-${Number(item.deliveryTime) + 15} min | Bs. ${item.shippingCost}`}
      image={item.imageName}
      uri={item.imageUri}
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