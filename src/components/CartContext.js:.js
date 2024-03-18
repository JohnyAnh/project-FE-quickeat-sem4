// Trong file CartContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import cartService from "@/src/services/cartService";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await cartService.getCarts();
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setCartData(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch cart data: ", error);
            }
        };

        fetchCartData();
    }, []);


    const addToCart = async (productId, restaurantId, quantity) => {
        try {
            await cartService.createCart({ productId, restaurantId, qty: quantity });
            // Sau khi thêm vào giỏ hàng, cập nhật lại cartData
            const response = await cartService.getCarts();
            if (Array.isArray(response.data) && response.data.length > 0) {
                setCartData(response.data);
            }
        } catch (error) {
            console.error("Failed to add item to cart: ", error);
        }
    };

    return (
        <CartContext.Provider value={{ cartData, setCartData, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
