import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ProductFormReducer from './ProductFormReducer'
import StoreReducer from './StoreReducer';
import StoreFormReducer from './StoreFormReducer';

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
    stores: StoreReducer,
    storeForm: StoreFormReducer
});
