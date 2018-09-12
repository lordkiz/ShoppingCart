import React, { Component } from 'react';
import {
	View,
	TouchableHighlight,
	StyleSheet,
	Text,
	ScrollView,
	Dimensions,
	Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CartBadge from '../components/CartBadge';
import { Card } from 'react-native-elements';

const allProducts = {
	"categories": [
		{
			"name": "Female Wears",
            "tagline": "Ladies wear from top Designers",
			"feature_image": "https://pixel.nymag.com/imgs/fashion/daily/2017/03/23/Prada/10.w710.h473.2x.jpg",
			"products": [
				{
					"brand_name": "Gown One",
					"designer_name": "Mitsun",
					"id": "mitsun-gown-2",
					"sku": "mitsu-gown-2",
					"price": 1200,
					"previous_price": 1300,
					"image": "https://a.1stdibscdn.com/archivesE/upload/366869/v_21961831481114114860/PRADA_copy_org_l.jpg",
					"description": [
						"A beautiful black gown"
					],
					"instructions": [
						"Wash when dirty",
                        "Hang to dry"
					]
				},
				{
					"brand_name": "Dress Mi",
					"designer_name": "Prada",
					"id": "dress-prada",
					"sku": "dress-prada",
					"price": 750,
					"previous_price": 1000,
					"image": "https://img.snobswap.com/wZRsUlFS9S903yushj8W_2668173l.jpg",
					"description": [
						"A slightly over priced dress hehehehehe"
					],
					"instructions": [
						"Too precious to wash",
                        "Wear everyday"
					]
				}
			]
		},

		{
			"name": "Men's Wear",
			"tagline": "Men's wear from top Designers",
			"feature_image": "https://sc01.alicdn.com/kf/HTB1F2jvRVXXXXbHaXXXq6xXFXXXg/custom-business-cashmere-wool-mens-suit.jpg",
			"products": [
				{
					"brand_name": "Sean Jean",
					"designer_name": "Tailorloron",
					"id": "tailorloronsean",
					"sku": "tailorloronsean",
					"price": 1000,
					"previous_price": 1300,
					"image": "https://4.imimg.com/data4/CQ/WI/MY-2290515/stylish-mens-suits-500x500.jpg",
                    "description": [
						"A slightly over priced suit hehehehehe"
					],
					"instructions": [
						"Too precious to wash",
                        "Wear everyday"
					]
				}
			]
		}
	]
};

export default class Home extends Component {

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: 'Shopping Cart Sample App By Kizito Egeonu',
            headerStyle: {
                backgroundColor: '#1F2D3D',
                elevation: 0,
            },
            headerTitleStyle: {
                color: '#fafafa',
                fontSize: 16,
                fontFamily: 'Montserrat-Medium'
            },
            headerRight: (
                <TouchableHighlight
                    onPress={() => navigation.navigate('Cart')}
                    style={{ paddingRight: 7}}
                >
                    <CartBadge />
                </TouchableHighlight>
            ),
        };
    }


    renderCategories() {
		return allProducts.categories.map((p, index) =>
			<TouchableHighlight
				key={index}
				onPress={() => {
                        this.props.navigation.navigate(
						'ProductCategory',
						{
                            category: p,
							products: p.products,
						})
                    }}
				underlayColor='#fafafa'
			>
                <View>
                <Card>
                    <Image
                        source={{uri: p.feature_image}}
                        style={{ width: deviceWidth/ 2.3, height: 100 }}
                    />
                </Card>
                    <View style={styles.catMetaView}>
                        <Text style={styles.catNameText}>
                            {p.name}
                        </Text>
                        <Text style={styles.tagLineText}>
                            {p.tagline}
                        </Text>
                    </View>
                </View>

			</TouchableHighlight>
		);
	}

	render() {
		return (
			<View>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionHeaderText}>
						Products
					</Text>
					<Text style={styles.viewAllText}>
						swipe
					</Text>
				</View>

				<ScrollView horizontal>
					{this.renderCategories()}
				</ScrollView>

			</View>
		);
	}
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

	cardContainerStyle: {
		width: 200
	},

	cardWrapperStyle: {
		justifyContent: 'center',
		alignItems: 'center'
	},

	sectionHeader: {
		flexDirection: 'row',
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 10,
		marginBottom: -5
	},

	sectionHeaderText: {
		color: '#00234b',
		fontSize: 15,
		flex: 1,
		fontFamily: 'Montserrat-Medium'
	},

	viewAllText: {
		color: '#2bbfed',
		fontSize: 15,
		textAlign: 'right',
		fontFamily: 'Montserrat-Medium'
	},

    catMetaView: {
        width: deviceWidth/2,
        padding: 13,
    },

    catNameText: {
        fontSize: 13,
        fontWeight: 'normal',
        fontFamily: 'Montserrat-Regular',
    },

    subHeaderText: {
        fontSize: 11,
        fontWeight: 'normal',
        fontFamily: 'Montserrat-Regular',
        color: '#333',
    },

    tagLineText: {
        fontSize: 8,
        fontWeight: 'normal',
        fontFamily: 'Montserrat-Regular',
        color: '#2BBFED',
    }
});
