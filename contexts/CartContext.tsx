import React, { createContext, useContext, useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
  totalPrice: number;
};

type CartContextValue = {
  products: Product[];
  cartItems: CartItem[];
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const PRODUCTS: Product[] = [
  { id: "p1", name: "Wireless Headphones", price: 79.99 },
  { id: "p2", name: "Smart Watch", price: 129.0 },
  { id: "p3", name: "Bluetooth Speaker", price: 59.5 },
  { id: "p4", name: "Portable Charger", price: 24.99 },
  { id: "p5", name: "Laptop Stand", price: 34.0 },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const addToCart = (product: Product) => {
    setQuantities((current) => ({
      ...current,
      [product.id]: (current[product.id] ?? 0) + 1,
    }));
  };

  const removeFromCart = (product: Product) => {
    setQuantities((current) => {
      const next = { ...current };
      const nextQty = (next[product.id] ?? 0) - 1;
      if (nextQty <= 0) {
        delete next[product.id];
      } else {
        next[product.id] = nextQty;
      }
      return next;
    });
  };

  const clearCart = () => setQuantities({});

  const cartItems = useMemo<CartItem[]>(() => {
    return PRODUCTS.filter((product) => quantities[product.id]).map((product) => {
      const quantity = quantities[product.id] ?? 0;
      return {
        ...product,
        quantity,
        totalPrice: quantity * product.price,
      };
    });
  }, [quantities]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);

  const value = useMemo<CartContextValue>(
    () => ({
      products: PRODUCTS,
      cartItems,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [cartItems, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
}
