import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ProductFormReducer from './ProductFormReducer'
import StoreReducer from './StoreReducer';

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
    stores: StoreReducer
});
