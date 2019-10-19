import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ProductFormReducer from './ProductFormReducer'

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
});
