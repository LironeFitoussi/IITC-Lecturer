import React, { useState } from 'react';
import { StatusBar, FlatList, Modal } from 'react-native'
import { registerRootComponent } from 'expo'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Components
import ProductCard from './components/ProductCard';
import Header from './components/Header';

function handleButtonClick() {
    console.log("Button Clicked!")
}

const burgers = [
    {
        id: '40840sdf',
        name: "Smash Burger",
        price: "82",
        onAddToCart: handleButtonClick,
        image: "https://www.foodandwine.com/thmb/XE8ubzwObCIgMw7qJ9CsqUZocNM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg"
    },
    {
        id: '12345abc',
        name: "Classic Cheeseburger",
        price: "76",
        onAddToCart: handleButtonClick,
        image: "https://www.simplyrecipes.com/thmb/1rLQzN7qzjQwqKk2zYZej34I4dI=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Cheeseburger-Lead-Shot-2b-0af86a61b98d46f9910d9c2a38c13e28.jpg"
    },
    {
        id: '67890def',
        name: "Bacon BBQ Burger",
        price: "95",
        onAddToCart: handleButtonClick,
        image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/exps28800_TH143193B04_22_2bC_RMS-696x696.jpg"
    },
    {
        id: '54321ghi',
        name: "Double Patty Deluxe",
        price: "110",
        onAddToCart: handleButtonClick,
        image: "https://www.budgetbytes.com/wp-content/uploads/2021/05/Double-Cheeseburger-plate.jpg"
    },
    {
        id: '09876jkl',
        name: "Spicy Jalapeño Burger",
        price: "88",
        onAddToCart: handleButtonClick,
        image: "https://www.chilipeppermadness.com/wp-content/uploads/2022/06/Jalapeno-Burger-Recipe1.jpg"
    },
    {
        id: '09876SDAjkl',
        name: "Mushroom Swiss Burger",
        price: "92",
        onAddToCart: handleButtonClick,
        image: "https://www.allrecipes.com/thmb/XA1b5wE7SijFQ3Shb7TLXwPpIMs=/2000x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-mushroom-swiss-burger-4x3-1-b03a3e5f7478470f9fc37bfc9b289e44.jpg"
    },
    {
        id: '11223mno',
        name: "Veggie Burger",
        price: "78",
        onAddToCart: handleButtonClick,
        image: "https://cookieandkate.com/images/2018/01/best-veggie-burger-recipe-3.jpg"
    }
];


export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [ isModalOpen, setIsModalOpen] = useState(false)

    function renderCard (item: any) {
        return (
        <ProductCard
            name={item.name}
            price={item.price}
            onAddToCart={item.onAddToCart}
            image={item.image}
        />
    )}
    return (
        <>
            <StatusBar
                barStyle={isDarkMode ? 'dark-content' : 'light-content'}
                // hidden={true}
                // Background color is available only for android devices
                backgroundColor='#6200EE'
            />
            <Header />
                <FlatList 
                    style={{
                        padding: 16,
                        backgroundColor: '#6200EE',
                        flex: 1,
                    }}
                    contentContainerStyle={{
                        alignItems: 'center',

                    }}
                    data={burgers}
                    renderItem={({item}) =>renderCard(item)}
                    keyExtractor={item => item.id}
                />
        </>
    )
}

registerRootComponent(App)