import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children, initialCartProducts}) {
    const [cartProducts, setCartProducts] = useState(initialCartProducts);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("cart", JSON.stringify(cartProducts));
        }
    }, [cartProducts]);

    function addProduct(productId) {
        setCartProducts((prev) => [...prev, productId]);
    }

    function removeProduct(productId) {
        setCartProducts((prev) => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }

    function clearCart() {
        setCartProducts([]);
    }

    return (
        <CartContext.Provider
            value={{
                cartProducts,
                setCartProducts,
                addProduct,
                removeProduct,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}