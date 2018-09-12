import React from 'react';
import {
	StackNavigator,
} from 'react-navigation';

import ProductCategory from '../screens/ProductCategory';
import Product from '../screens/Product';
import Cart from '../screens/Cart';
import CheckOut from '../screens/CheckOut';
import Home from '../screens/Home';

export const MainNavigation = StackNavigator({
	Home: {
		screen: Home
	},
	ProductCategory: {
		screen: ProductCategory
	},
	Product: {
		screen: Product
	},
	Cart: {
		screen: Cart
	},
	CheckOut: {
		screen: CheckOut
	},
});
