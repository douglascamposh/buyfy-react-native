import { combineReducers } from 'redux';
import ProductReducer from './ProductListReducer';
import ProductFormReducer from './ProductFormReducer';
import ProductOrderForm from './ProductOrderFormReducer';
import StoresReducer from './StoresListReducer';
import StoreReducer from './StoreReducer';
import StoreFormReducer from './StoreFormReducer';
import OrderReducer from './OrderReducer';
import OrdersReducer from './OrdersReducer';
import InvoiceFormReducer from './InvoiceFormReducer';
import InvoicesReducer from './InvoicesReducer';
import InvoiceReducer from './InvoiceReducer';
import AddressReducer from './AddressListReducer';
import AddressFormReducer from './AddressFormReducer';
import StoresAdminReducer from './StoresAdminListReducer';
import UserDataReducer from './UserDataReducer';

export default combineReducers({
    products: ProductReducer,
    productForm: ProductFormReducer,
    productOrderForm: ProductOrderForm,
    stores: StoresReducer,
    storeForm: StoreFormReducer,
    adminStores: StoresAdminReducer,
    store: StoreReducer,
    order: OrderReducer,
    orders: OrdersReducer,
    invoiceForm: InvoiceFormReducer,
    invoices: InvoicesReducer,
    invoice: InvoiceReducer,
    addresses: AddressReducer,
    addressForm: AddressFormReducer,
    user: UserDataReducer,
});