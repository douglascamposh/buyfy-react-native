import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ProductFormReducer from './ProductFormReducer';
import ProductOrderForm from './ProductOrderFormReducer';
import StoresReducer from './StoresReducer';
import StoreReducer from './StoreReducer';
import StoreFormReducer from './StoreFormReducer';
import OrderReducer from './OrderReducer';
import OrdersReducer from './OrdersReducer';
import InvoiceFormReducer from './InvoiceFormReducer';
import InvoicesReducer from './InvoicesReducer';
import InvoiceReducer from './InvoiceReducer';
import AddressReducer from './AddressReducer';
import AddressFormReducer from './AddressFormReducer';
import StoresAdminReducer from './StoresAdminReducer';
import UserDataReducer from './UserDataReducer';

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
    productOrderForm: ProductOrderForm,
    stores: StoresReducer,
    adminStores: StoresAdminReducer,
    store: StoreReducer,
    storeForm: StoreFormReducer,
    order: OrderReducer,
    orders: OrdersReducer,
    invoiceForm: InvoiceFormReducer,
    invoices: InvoicesReducer,
    invoice: InvoiceReducer,
    addresses: AddressReducer,
    addressForm: AddressFormReducer,
    user: UserDataReducer,
});