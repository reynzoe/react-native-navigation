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
  removeItems: (ids: string[]) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const PRODUCTS: Product[] = [
  {
    id: "n1",
    name: "Giannis Immortality 4 EP",
    price: 120.0,
    image: "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ea0e5050-dce2-41a2-aee4-a984991c3f42/GIANNIS+IMMORTALITY+4+EP.png",
  },
  {
    id: "n1w",
    name: "Nike x Stussy Utility Hooded Jacket",
    price: 160.0,
    image: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/4ffce8b1-a1cc-427d-b96a-e1d58beb67fa/nike-x-st%C3%BCssy-apparel-collection-release-date.jpg",
  },
  {
    id: "n2",
    name: "Nike Zoom Pulse",
    price: 98.5,
    image: "https://media.about.nike.com/img/c0e87578-1c7c-4f32-b177-1ac4d0fcd31a/nikenews-doernbecherfreestyle2019-airzoompulse-sawyer-xvi-13306-91593.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjowLCJ0b3AiOjAsIndpZHRoIjoxNjAwLCJoZWlnaHQiOjExOTl9LCJyZXNpemUiOnsid2lkdGgiOjM4NDB9fX0%3D&s=5742b866d0d64157b5541bf0ed56b14c7b8a992aa57ccdf0b80e5035d10503a7",
  },
  {
    id: "n1c",
    name: "Miami Heat 2025 City Edition Black 9FIFTY Snapback Cap",
    price: 55.0,
    image: "https://neweracap.ph/cdn/shop/files/60761373_03305373_3.jpg?v=1764858664&width=2000"
  },
  {
    id: "n3",
    name: "Nike Runway Tee",
    price: 32.0,
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/794e80e0-8eff-48f0-adb2-8dc88d09357c/AS+W+NSW+TEE+CLASSICS+BOXY.png",
  },
  {
    id: "n4",
    name: "Nike Court Jacket",
    price: 89.0,
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto/73eefc67-3a0c-43e8-97fd-fd4f42cdd99d/AS+M+NKCT+HERITAGE+JACKET.png",
  },
  {
    id: "a1",
    name: "ANTHONY EDWARDS 2 Bruce Lee",
    price: 110.0,
    image: "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/b5e556629f3f4d1eaddcd1deff15c6ea_9366/anthony-edwards-2-shoes.jpg",
  },
  {
    id: "a2",
    name: "Adidas Street Flex",
    price: 95.0,
    image: "https://hips.hearstapps.com/hmg-prod/images/adidas-aerobounce-st-womens-tread-1527015631.jpg?crop=1xw:1xh;center,top&resize=980:*",
  },
  {
    id: "a3",
    name: "adidas Basketball Tee (Gender Neutral)",
    price: 28.0,
    image: "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/32fdb350e8f44ac78d714c314c8b4675_9366/adidas-basketball-tee-gender-neutral.jpg",
  },
  {
    id: "a4",
    name: "Adidas Run It Shorts",
    price: 36.0,
    image: "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/021457aba7064bdcb47f0539d1fa6af7_9366/run-it-shorts.jpg",
  },
  {
    id: "b1",
    name: "New Balance 327",
    price: 105.0,
    image: "https://pimpkicks.com.ph/cdn/shop/files/NewBalance327BeigeWhiteGumPinkWomen_s.png?v=1697878360",
  },
  {
    id: "b2",
    name: "New Balance 574",
    price: 112.0,
    image: "https://www.footlocker.ph/media/catalog/product/cache/f57d6f7ebc711fc328170f0ddc174b08/0/8/0803-NEWML574EVGGRE10H-1.jpg",
  },
  {
    id: "b3",
    name: "New Balance Sport Essentials Space Dye 1/4 Zip",
    price: 30.0,
    image: "https://nb.scene7.com/is/image/NB/wt41150ahh_nb_55_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
  },
  {
    id: "b4",
    name: "New Balance Track Pant",
    price: 54.0,
    image: "https://nb.scene7.com/is/image/NB/mb61m77eabg_nb_70_i?$pdpflexf22x$&qlt=80&fmt=webp&wid=880&hei=880",
  },
  {
    id: "n5",
    name: `Nike Lebron XXIII "Grand Opening`,
    price: 135.0,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,c_scale,w_300,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/63073d94-bbf8-428b-80a3-c98ee915860c/LEBRON+XXIII+EP.png",
  },
  {
    id: "n6",
    name: "Lakers Statement Edition Jersey",
    price: 72.0,
    image: "https://cdn.nba.com/teams/uploads/sites/1610612747/2025/06/2526_lal_mktg_statement-edition_release_1130x635_ska.jpg",
  },
  {
    id: "a5",
    name: "Harden Volume 9",
    price: 102.0,
    image: "https://assets.adidas.com/images/w_766,h_766,f_auto,q_auto,fl_lossy,c_fill,g_auto/e739b34ad5344f3fa5e8e7f84aef0783_9366/harden-volume-9.jpg",
  },
  {
    id: "a6",
    name: "Adidas Chinese Jacket",
    price: 26.0,
    image: "https://osakarun.com/wp-content/uploads/2025/12/shang1.png",
  },
  {
    id: "b5",
    name: "New Balance 2002r",
    price: 118.0,
    image: "https://image.goxip.com/ri1eSBxRMMS2kqlJS-wEcHGedY8=/fit-in/500x500/filters:format(jpg):quality(80):fill(white)/https:%2F%2Fimages.stockx.com%2Fimages%2FNew-Balance-2002R-Grey-White-Product.jpg",
  },
  {
    id: "b6",
    name: "Nike Ja 3",
    price: 44.0,
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/69503ed9-a6af-4ba2-8961-91b366bf3805/JA+3+EP.png",
  },
  {
    id: "n7",
    name: "Nike Denim Cap",
    price: 24.0,
    image: "https://static.nike.com/a/images/t_web_pdp_936_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9f3c545d-c379-4d29-bfe8-19ef5ae2cdf2/U+NK+CLUB+CAP+U+CB+DENIM+24+L.png",
  },
  {
    id: "a7",
    name: "Adidas Campus 00s",
    price: 68.0,
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/f81a93942800473fa6cbaf7b00b2d48b_9366/Campus_00s_Shoes_Blue_H03471_01_standard.jpg",
  },
  {
    id: "b7",
    name: "New Balance 9060",
    price: 16.0,
    image: "https://cdn-images.farfetch-contents.com/19/92/34/51/19923451_44701114_1000.jpg",
  },
  {
    id: "n8",
    name: `Nike Book 2 "The Phoenix"`,
    price: 80.0,
    image: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/c126fb00-d566-49ce-9833-9a515f51b7bc/book-2-phoenix-sundial-and-black-ib6688-700-release-date.jpg",
  },
  {
    id: "n9",
    name: `Sabrina 3`,
    price: 75.0,
    image:"https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/88618e46-179f-4af2-8924-246e751170b3/SABRINA+3+EP.png"
  },
  {
    id: "n10",
    name: `Tottenham Hotspur 2025/26 Stadium Home`,
    price: 55.0,
    image:"https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/207642cc-1751-4799-ba1a-b4b3ca9a8dc5/THFC+M+NK+DF+JSY+SS+STAD+HM.png",
  },
  {
    id: "n11",
    name: `F.C. Barcelona 2025/26 Stadium Home`,
    price: 57.0,
    image:"https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a62f5ffa-30fb-40ea-aeb9-2739fea3d557/FCB+M+NK+DF+JSY+SS+STAD+HM.png",
  },
  {
    id: "n12",
    name: `Nike Women's Slim Retro Polo Top`,
    price: 24.0,
    image:"https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/838a371c-e101-47bc-939d-aa55da9e9687/AS+W+NSW+RETRO+POLO+SPD.png",
  },
  {
    id: "b8",
    name: "New Balance KAWHI IV BBKLSSP4",
    price: 130.0,
    image:"https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F01%2F26%2Fkawhi-leonard-new-balance-kawhi-4-bbklssp4-release-date-01.jpg?q=75&w=800&cbr=1&fit=max",
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
  const removeItems = (ids: string[]) => {
    setQuantities((current) => {
      const next = { ...current };
      ids.forEach((id) => {
        delete next[id];
      });
      return next;
    });
  };

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
      removeItems,
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
