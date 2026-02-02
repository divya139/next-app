import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  productImage: string;
  productTitle: string;
  quantity: number;
  price: number;
}

interface AddressDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface StoreState {
  // Cart State
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;

  // Address State
  addressDetails: AddressDetails;
  setAddressDetails: (address: AddressDetails) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial Cart State
      cartItems: [],

      // Cart Actions
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cartItems: [...state.cartItems, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cartItems: [] }),

      getTotalPrice: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      // Initial Address State
      addressDetails: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },

      // Address Actions
      setAddressDetails: (address) => set({ addressDetails: address }),
    }),
    {
      name: 'ecommerce-storage',
    }
  )
);