// contexts/CartContext.tsx
// Context global pour la gestion du panier et de l'état modal
// Optimisé pour conversion avec persistance des données

'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  color: 'rose' | 'bleu';
  quantity: number;
  image: string;
}

interface CartContextType {
  // État du modal
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  
  // État du panier
  item: CartItem | null;
  selectedColor: 'rose' | 'bleu';
  setSelectedColor: (color: 'rose' | 'bleu') => void;
  
  // Étapes du checkout
  currentStep: 1 | 2 | 3;
  setCurrentStep: (step: 1 | 2 | 3) => void;
  nextStep: () => void;
  previousStep: () => void;
  
  // Formulaire
  formData: CheckoutFormData;
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  
  // Actions
  addToCart: (color: 'rose' | 'bleu') => void;
  clearCart: () => void;
}

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialFormData: CheckoutFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<'rose' | 'bleu'>('rose');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [item, setItem] = useState<CartItem | null>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    // Toujours commencer à l'étape 1
    setCurrentStep(1);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Réinitialiser à l'étape 1 pour la prochaine ouverture
    setTimeout(() => setCurrentStep(1), 300);
  }, []);

  const addToCart = useCallback((color: 'rose' | 'bleu') => {
    const newItem: CartItem = {
      id: 'bol-maju',
      name: `Bol maju - ${color === 'rose' ? 'Rose Vif' : 'Bleu'}`,
      price: 39.99,
      color,
      quantity: 1,
      image: `https://www.maju-nutrition.com/cdn/shop/files/maju-bol-${color}-explication-compartiments.jpg`,
    };
    
    setItem(newItem);
    setSelectedColor(color);
  }, []);

  const clearCart = useCallback(() => {
    setItem(null);
    setFormData(initialFormData);
    setCurrentStep(1);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 3) as 1 | 2 | 3);
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3);
  }, []);

  const updateFormData = useCallback((data: Partial<CheckoutFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const contextValue: CartContextType = {
    isModalOpen,
    openModal,
    closeModal,
    item,
    selectedColor,
    setSelectedColor,
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    formData,
    updateFormData,
    addToCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};