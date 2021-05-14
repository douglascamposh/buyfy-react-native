import { combineReducers } from 'redux';
import ProductReducer from './ProductListReducer';
import ProductOrderForm from './ProductOrderFormReducer';
import StoresReducer from './StoresListReducer';
import StoreReducer from './StoreReducer';
import OrderReducer from './OrderReducer';
import OrdersReducer from './OrdersReducer';
import InvoiceFormReducer from './InvoiceFormReducer';
import InvoicesReducer from './InvoicesReducer';
import InvoiceReducer from './InvoiceReducer';
import AddressReducer from './AddressListReducer';
import StoresAdminReducer from './StoresAdminListReducer';
import UserDataReducer from './UserDataReducer';

export default combineReducers({
    products: ProductReducer,
    productOrderForm: ProductOrderForm,
    stores: StoresReducer,
    adminStores: StoresAdminReducer,
    store: StoreReducer,
    order: OrderReducer,
    orders: OrdersReducer,
    invoiceForm: InvoiceFormReducer,
    invoices: InvoicesReducer,
    invoice: InvoiceReducer,
    addresses: AddressReducer,
    user: UserDataReducer,
});