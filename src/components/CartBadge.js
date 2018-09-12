import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

class CartBadge extends Component {
    render() {
        if (this.props.products.length > 0) {
            return (
                <View style={styles.container}
                >
                    <View style={styles.badge}>
                        <Text style={styles.count}>
                            {this.props.products.length}
                        </Text>
                    </View>
                    <View>
                        <Icon size={20} color='#2BEDBA' name='shopping-cart' />
                    </View>
                </View>
            );
        }
        return (
            <View
                style={styles.container}
            >
                <Icon size={20} color='#2BEDBA' name='shopping-cart' />
            </View>
        );
    }
}

const styles = StyleSheet.create({

    badge: {
        backgroundColor: '#FF4949',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 2,
		borderColor: '#FF4949',
		borderWidth: 1,
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
        marginRight: -4,
        marginBottom: -7,
    },

    count: {
        fontSize: 10,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        color: '#FFF'
    }
});

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    };
}

export default connect(mapStateToProps)(CartBadge);
