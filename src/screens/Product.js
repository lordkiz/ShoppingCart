import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Alert,
    AsyncStorage,
    TouchableHighlight,
    ScrollView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Card, Button } from 'react-native-elements';
import { addItemToCart, increaseItemQuantity } from '../actions/CartActions';
import CartBadge from '../components/CartBadge';

class Product extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: params.product.brand_name,
            headerStyle: {
                backgroundColor: '#f6f6f6',
                //elevation: 0,
            },
            headerTitleStyle: {
                color: '#00234b',
                fontSize: 16,
                fontFamily: 'Montserrat-Medium'
            },
            headerRight: (
                <View style={{ flexDirection: 'row', paddingRight: 15 }}>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('Cart', {clearCart: false})}
                        style={{ paddingRight: 7}}
                    >
                        <CartBadge />
                    </TouchableHighlight>
                </View>
            ),
        };
    }

    addProductToCart(item) {
        console.log('item', item);
        const product = Object.assign({}, item, {quantity: 1 });
        let itemQty = product.quantity;
        let productExists = false;
        let productIndex = -1;
        this.props.products.forEach((p, idx) => {
            if (product.id === p.id) {
                productExists = true;
                productIndex = idx;
            }
        });
        if (productExists) {
            if (itemQty == undefined) {
                itemQty = 1;
            } else {
                itemQty = product.quantity;
            }
            Alert.alert(null, `${product.brand_name} is already in cart! Quantity increased by 1.`)
            this.props.increaseItemQuantity(productIndex, product, (itemQty += 1));
        } else {
            this.props.addItemToCart(product);
            Alert.alert(null, `${product.brand_name} has been added to cart`);
        }
    }

    render() {
        const { product } = this.props.navigation.state.params
        return (
			<ScrollView
				style={styles.container}
			>
				<Image
					source={{ uri: product.image }}
					style={{ width: Dimensions.get('window').width, height: 200 }}
				/>
                <View style={styles.productView}>
                    <Text style={styles.titleText}>
                        {product.brand_name}
                    </Text>
                </View>

                <Text style={styles.designerNameText}>
                    {product.designer_name}
                </Text>

                <View style={styles.sectionHeaderView}>
                    <Text style={styles.sectionHeaderText}>
                        Description
                    </Text>
                </View>
                <View>
                {
                    product.description.map((c, index) =>
                        <Text style={styles.sectionBodyText} key={index}>
                            {(index + 1) + ' - ' + c}
                        </Text>
                    )
                }
                </View>

                <View style={styles.sectionHeaderView}>
                    <Text style={styles.sectionHeaderText}>
                        Instructions
                    </Text>
                </View>
                <View>
                {
                    product.instructions.map((ins, index) =>
                        <Text style={styles.sectionBodyText} key={index}>
                            {(index + 1) + ' - ' + ins}
                        </Text>
                    )
                }
                </View>

                <View style={{ padding: 15 }} />

                <Button
                    title='Add to Cart'
                    backgroundColor='#1F2D3D'
                    large
                    borderRadius={50}
                    onPress={this.addProductToCart.bind(this, product)}
                />

                <View style={{ padding: 15 }} />

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fafafa'
	},

	productView: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 15,
		paddingBottom: 5,

	},

	titleText: {
		color: '#00234b',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		fontFamily: 'Montserrat-Medium'
	},

	designerNameText: {
		color: '#C0CCDA',
		fontSize: 13,
		textAlign: 'center',
		fontFamily: 'Montserrat-Regular',
        paddingBottom: 20,
	},

    sectionHeaderView: {
		padding: 10,
		backgroundColor: '#f4f4f4',
	},
	sectionHeaderText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#a3a3a3',
		fontFamily: 'Montserrat-Medium'
	},
    sectionBodyText: {
		color: '#00234b',
		padding: 10,
		fontSize: 16,
		fontFamily: 'Montserrat-Regular'
	},
});

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        total: state.products.total
    };
}


export default connect(mapStateToProps, {
    increaseItemQuantity,
    addItemToCart
})(Product);
