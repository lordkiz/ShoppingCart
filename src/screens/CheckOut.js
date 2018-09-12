import React, { Component, } from 'react';
import { View,
	Text,
	TouchableHighlight,
	StyleSheet,
	AsyncStorage,
	Dimensions,
	TextInput,
    Picker,
	ScrollView,
	Alert,
    Platform,
    ToastAndroid,
	ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { clearCartContent } from '../actions/CartActions';


class CheckOut extends Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: 'Check Out',
            headerStyle: {
                backgroundColor: '#F6F6F6',
                elevation: 0,
            },
            headerTitleStyle: {
                color: '#00234B',
                fontSize: 16,
                fontFamily: 'Montserrat-Medium'
            },
        };
    }

    state = {
        paymentLoading: false,
		loading: false,
        name: 'Rich Buyer',
        phone: '',
        address: '',
	}

	placeOrder() {
		//bill Card
		//create  order in your backend
		// if order succeeds, clearCartContent
		// redirect user to another screen
		return null;
	}

	validateForm() {
        const { address, phone } = this.state;
        if (address.length == 0 || phone.length == 0) {
                Alert.alert(
					null,
					'Please ensure all fields in delivery details section are filled'
				);
        } else {
			this.placeOrder();
		}
    }

    renderAddressForm() {
        return (
            <View style={{ marginBottom: 15 }}>
                <View style={styles.sectionHeaderView}>
                    <Text style={styles.sectionHeaderText}>
                        Delivery details
                    </Text>
                </View>
                <View style={styles.deliverToView}>
                    <Text style={styles.deliverToText}>
                        Deliver to state.user
                    </Text>
                </View>
                <View>
                    <View style={styles.formField}>
                        <Text style={styles.formLabelStyle}>
                            Phone
                        </Text>
                        <TextInput
                            underlineColorAndroid='transparent'
                            placeholder='Phone'
                            value={this.state.phone}
                            onChangeText={(phone) => this.setState({ phone })}
                         />
                     </View>
                </View>
                <View style={styles.formField}>
                    <Text style={styles.formLabelStyle}>
                        Street Address
                    </Text>
                    <TextInput
                       underlineColorAndroid='transparent'
                       multiLine
                       numberOfLines={2}
                       placeholder='Address Line'
                       value={this.state.address}
                       onChangeText={(address) => this.setState({ address })}
                     />
                 </View>
             </View>
        )
    }

    renderProducts() {
        return this.props.products.map((p) =>
            <View style={styles.itemContainer} key={p.id}>
                <View style={styles.nameContainer}>
                    <Text style={styles.brandNameText}>
                        {p.brand_name}
                    </Text>
                    <Text style={styles.manNameText}>
                        {p.designer_name}
                    </Text>
                </View>
                <View>
                    <Text style={styles.priceText}>
                        N{p.price}
                    </Text>
                </View>
                <View>
                    <Text style={styles.itemQtyText}>
                        {p.quantity}
                    </Text>
                </View>
                <View>
                    <Text style={styles.priceText}>
                        Item total: ${p.quantity * p.price}
                    </Text>
                </View>
            </View>
        )
    }

    renderTotal() {
        return (
            <View style={styles.totalContainer}>
                <Text style={styles.totalPriceText}>
                    <Text style={styles.totalText}>Total:</Text> ${this.props.total}
                </Text>
            </View>
        )
    }

    renderButton() {
        return (
            <TouchableHighlight
                onPress={this.validateForm.bind(this)}
            >
                <View style={styles.buttonView}>
                    <Text style={styles.buttonText}>
		                Place Order
	                </Text>
                </View>
            </TouchableHighlight>
		);
	}

    render() {
        if (this.state.loading) {
            return <ActivityIndicator size='large' color='#2bbfed' />;
        }
        return (
            <ScrollView>
                {this.renderProducts()}
                {this.renderTotal()}
                {this.renderAddressForm()}
                {
                    this.state.paymentLoading ?
                    <ActivityIndicator size='large' color='#00234B' />
                    :
                    this.renderButton()
                }
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    sectionHeaderView: {
		padding: 10,
		backgroundColor: '#f9f9f9',
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

    itemContainer: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#FFF',
        marginBottom: 7,
        justifyContent: 'space-between',
    },

    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

    brandNameText: {
        fontWeight: 'normal',
		color: '#00234B',
        fontSize: 13,
		fontFamily: 'Montserrat-Medium'
    },

    manNameText: {
        fontWeight: 'normal',
		color: '#8492A6',
        fontSize: 9,
		fontFamily: 'Montserrat-Regular',
        paddingBottom: 5
    },

    qtyView: {
		backgroundColor: '#3C4858',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderColor: '#3C4858',
		borderWidth: 1,
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
        marginRight: 12,
        marginLeft: 12,
	},

    itemQtyText: {
        fontWeight: 'bold',
		color: '#3C4858',
        fontSize: 13,
		fontFamily: 'Montserrat-Regular'
    },

    priceText: {
        fontWeight: 'normal',
		color: '#13CE66',
        fontSize: 13,
		fontFamily: 'Montserrat-Regular',
        paddingLeft: 5,
    },

    totalContainer: {
        marginTop: -7,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10,
        backgroundColor: '#00234B',
    },

    totalText: {
        fontWeight: 'bold',
		color: '#FAFAFA',
        fontSize: 13,
		fontFamily: 'Montserrat-Regular'
    },

    totalPriceText: {
        fontWeight: 'bold',
		color: '#2BBFED',
        fontSize: 13,
		fontFamily: 'Montserrat-Regular'
    },

    formField: {
        backgroundColor: '#FCFCFC',
        borderColor: '#F1F1F1',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 7,
        margin: 5,
    },

    formLabelStyle: {
        fontSize: 12,
        color: '#2bbfed',
        fontFamily: 'Montserrat-Regular'
    },

    deliverToView: {
        padding: 3,
        backgroundColor: '#1F2D3D',
        marginBottom: 7,
    },

    deliverToText: {
        fontSize: 10,
        fontFamily: 'Montserrat-Regular',
        color: '#FFF',
    },


    buttonView: {
      backgroundColor: '#2bbfed',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 20,
      marginTop: 10,
      marginBottom: 10,
    },

    buttonText: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: 'Montserrat-Medium',
      color: '#fafafa'
    },

    InactivebuttonView: {
  	    backgroundColor: '#cccccc',
  	    alignItems: 'center',
  	    paddingTop: 20,
  	    paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
  	},

  	InactivebuttonText: {
  		fontSize: 18,
  		textAlign: 'center',
  		fontFamily: 'Montserrat-Medium',
  		color: '#a3a3a3'
  	},

});

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        total: state.products.total
    }
}

export default connect(mapStateToProps, { clearCartContent })(CheckOut);
