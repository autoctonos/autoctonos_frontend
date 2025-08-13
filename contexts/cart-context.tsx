// cart-context.tsx
import { createContext, useContext, ReactNode } from "react";
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Types
interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  incrementItem: (productId: string) => void;
  decrementItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  clearCart: () => void;
}

// Atoms con persistencia
const cartItemsAtom = atomWithStorage<CartItem[]>('cart-items', []);
const isCartOpenAtom = atomWithStorage<boolean>('cart-open', false);

// Context (se mantiene para compatibilidad)
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [isCartOpen, setIsCartOpen] = useAtom(isCartOpenAtom);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
    openCart();
  };

  const incrementItem = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (productId: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado (mantiene la misma API)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};