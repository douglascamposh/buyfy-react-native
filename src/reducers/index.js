import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ProductFormReducer from './ProductFormReducer';
import ProductOrderForm from './ProductOrderFormReducer';
import StoreReducer from './StoreReducer';
import StoreFormReducer from './StoreFormReducer';
import OrderReducer from './OrderReducer';
import InvoiceFormReducer from './InvoiceFormReducer';
import InvoicesReducer from './InvoicesReducer';
import InvoiceReducer from './InvoiceReducer';

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
    productOrderForm: ProductOrderForm,
    stores: StoreReducer,
    storeForm: StoreFormReducer,
    order: OrderReducer,
    invoiceForm: InvoiceFormReducer,
    invoices: InvoicesReducer,
    invoice: InvoiceReducer
});
