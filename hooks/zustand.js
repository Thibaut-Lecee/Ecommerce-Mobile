import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create((set, get) => ({
    cartItems: {},
    favItems: {},
    // Initialize the cart from AsyncStorage
    initCart: async () => {
        const savedCartItems = await AsyncStorage.getItem('cartItems');
        const savedFavItems = await AsyncStorage.getItem('favItems');
        if (savedCartItems) {
            set({cartItems: JSON.parse(savedCartItems)});
            set({favItems: JSON.parse(savedFavItems)})
        } else {
            set({cartItems: {}});
            set({favItems: {}});
        }
    },
    addToCart: async (item, quantity) => {
        const updatedCartItems = {
            ...get().cartItems,
            [item.id]: get().cartItems[item.id] ?
                {...get().cartItems[item.id], quantity: get().cartItems[item.id].quantity + quantity}
                : {...item, quantity}
        };
        set({cartItems: updatedCartItems});
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    },
    removeFromCart: async (itemId, quantityToRemove = 1) => {
        console.log('removeFromCart', itemId, quantityToRemove);
        const cartItems = get().cartItems;
        const updatedCartItems = {...cartItems};
        if (updatedCartItems[itemId]) {
            if (quantityToRemove >= updatedCartItems[itemId].quantity) {
                // If the quantity to remove is greater than or equal to the item's quantity, delete the item
                delete updatedCartItems[itemId];
            } else {
                // Otherwise, decrease by the specified quantity
                updatedCartItems[itemId].quantity -= quantityToRemove;
            }
        }
        set({cartItems: updatedCartItems});
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    },
    clearCart: async () => {
        set({cartItems: {}});
        await AsyncStorage.removeItem('cartItems');
    },
    addToFav: async (item) => {
        const currentFavItems = get().favItems || {};
        const updatedFavItems = {
            ...currentFavItems,
            [item.id]: currentFavItems[item.id] ?
                {...currentFavItems[item.id]}
                : {...item}
        };
        set({favItems: updatedFavItems});
        await AsyncStorage.setItem('favItems', JSON.stringify(updatedFavItems));
    },

    removeToFav: async (itemId) => {
        const cartItems = get().cartItems;
        const updatedFavItems = {...cartItems};
        if (updatedFavItems[itemId]) {
            delete updatedFavItems[itemId];
        }
        set({favItems: updatedFavItems});
        await AsyncStorage.setItem('favItems', JSON.stringify(updatedFavItems));
    },
    clearFav: async () => {
        set({favItems: {}});
        await AsyncStorage.removeItem('favItems');
    },
}));
export default useStore;
