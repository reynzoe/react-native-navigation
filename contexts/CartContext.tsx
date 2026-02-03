import React, { createContext, useContext, useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
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
  {
    id: "n1",
    name: "Nike Air Nova",
    price: 120.0,
    image: "https://picsum.photos/seed/nike-shoe-1/600/600",
  },
  {
    id: "n2",
    name: "Nike Zoom Pulse",
    price: 98.5,
    image: "https://picsum.photos/seed/nike-shoe-2/600/600",
  },
  {
    id: "n3",
    name: "Nike Runway Tee",
    price: 32.0,
    image: "https://picsum.photos/seed/nike-shirt-1/600/600",
  },
  {
    id: "n4",
    name: "Nike Court Jacket",
    price: 89.0,
    image: "https://picsum.photos/seed/nike-jacket-1/600/600",
  },
  {
    id: "a1",
    name: "Adidas Aero Bounce",
    price: 110.0,
    image: "https://picsum.photos/seed/adidas-shoe-1/600/600",
  },
  {
    id: "a2",
    name: "Adidas Street Flex",
    price: 95.0,
    image: "https://picsum.photos/seed/adidas-shoe-2/600/600",
  },
  {
    id: "a3",
    name: "Adidas Core Tee",
    price: 28.0,
    image: "https://picsum.photos/seed/adidas-shirt-1/600/600",
  },
  {
    id: "a4",
    name: "Adidas Sprint Shorts",
    price: 36.0,
    image: "https://picsum.photos/seed/adidas-shorts-1/600/600",
  },
  {
    id: "b1",
    name: "New Balance 327",
    price: 105.0,
    image: "https://picsum.photos/seed/nb-shoe-1/600/600",
  },
  {
    id: "b2",
    name: "New Balance Metro",
    price: 112.0,
    image: "https://picsum.photos/seed/nb-shoe-2/600/600",
  },
  {
    id: "b3",
    name: "New Balance Active Tee",
    price: 30.0,
    image: "https://picsum.photos/seed/nb-shirt-1/600/600",
  },
  {
    id: "b4",
    name: "New Balance Track Pant",
    price: 54.0,
    image: "https://picsum.photos/seed/nb-pants-1/600/600",
  },
  {
    id: "n5",
    name: "Nike Glide Runner",
    price: 135.0,
    image: "https://picsum.photos/seed/nike-shoe-3/600/600",
  },
  {
    id: "n6",
    name: "Nike Motion Hoodie",
    price: 72.0,
    image: "https://picsum.photos/seed/nike-hoodie-1/600/600",
  },
  {
    id: "a5",
    name: "Adidas Cloud Foam",
    price: 102.0,
    image: "https://picsum.photos/seed/adidas-shoe-3/600/600",
  },
  {
    id: "a6",
    name: "Adidas Studio Tank",
    price: 26.0,
    image: "https://picsum.photos/seed/adidas-tank-1/600/600",
  },
  {
    id: "b5",
    name: "New Balance Trail Runner",
    price: 118.0,
    image: "https://picsum.photos/seed/nb-shoe-3/600/600",
  },
  {
    id: "b6",
    name: "New Balance Warmup Crew",
    price: 44.0,
    image: "https://picsum.photos/seed/nb-crew-1/600/600",
  },
  {
    id: "n7",
    name: "Nike Flex Cap",
    price: 24.0,
    image: "https://picsum.photos/seed/nike-cap-1/600/600",
  },
  {
    id: "a7",
    name: "Adidas Weekend Duffle",
    price: 68.0,
    image: "https://picsum.photos/seed/adidas-bag-1/600/600",
  },
  {
    id: "b7",
    name: "New Balance Sport Socks",
    price: 16.0,
    image: "https://picsum.photos/seed/nb-socks-1/600/600",
  },
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
