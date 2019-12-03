import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ProductFormReducer from './ProductFormReducer';
import ProductOrderForm from './ProductOrderFormReducer';
import StoreReducer from './StoreReducer';
import StoreFormReducer from './StoreFormReducer';

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
    productOrderForm: ProductOrderForm,
    stores: StoreReducer,
    storeForm: StoreFormReducer
});
