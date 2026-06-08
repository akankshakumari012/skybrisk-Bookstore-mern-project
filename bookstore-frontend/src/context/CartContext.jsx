import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      price: 499,
      quantity: 1,
    },
    {
      id: 2,
      title: "Harry Potter",
      price: 599,
      quantity: 1,
    },
  ]);

  // Add to Cart
  const addToCart = (book) => {
    const existingItem = cartItems.find((item) => item.id === book.id);

    if (existingItem) {
      // If book already in cart, increase quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new book to cart
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Increase Quantity
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
