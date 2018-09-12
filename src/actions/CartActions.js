import { Alert, ToastAndroid, AsyncStorage } from 'react-native';
import {
    ADD_ITEM, REMOVE_ITEM,
    INCREASE_ITEM, DECREASE_ITEM,
    CLEAR_CART
} from './types';

export function addItemToCart(product) {
    return {
        type: ADD_ITEM,
        product
    };
}

export function removeItemFromCart(index, product) {
    return {
        type: REMOVE_ITEM,
        index,
        product
    };
}

export function increaseItemQuantity(index, product, quantity) {
    return {
        type: INCREASE_ITEM,
        index,
        product,
        quantity
    };
}

export function decreaseItemQuantity(index, product, quantity) {
    return {
        type: DECREASE_ITEM,
        index,
        product,
        quantity
    };
}

export function clearCartContent() {
    return {
        type: CLEAR_CART
    }
}
