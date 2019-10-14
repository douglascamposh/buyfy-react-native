import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ImageReducer from './ImageReducer';
import ProductFormReducer from './ProductFormReducer'

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
    imageLoader: ImageReducer
});
