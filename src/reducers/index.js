import { combineReducers } from 'redux';

import { productsReducer } from './CartReducers';


const rootReducer = combineReducers({
	//cart
	products: productsReducer
});

export default rootReducer;
