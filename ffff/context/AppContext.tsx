import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser, mockProducts } from '@/data/mockData';
import { Product, User } from '@/types';

type AppContextType = {
  user: User | null;
  isAuthenticated: boolean;
  favoriteProducts: string[];
  login: () => void;
  logout: () => void;
  toggleFavorite: (productId: string) => void;
  getProductById: (id: string) => Product | undefined;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const [favoriteProducts, setFavoriteProducts] = useState<string[]>(
    mockProducts
      .filter(product => product.isFavorite)
      .map(product => product.id)
  );

  const isAuthenticated = !!user;

  const login = () => {
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleFavorite = (productId: string) => {
    setFavoriteProducts(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  const getProductById = (id: string) => {
    return mockProducts.find(product => product.id === id);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        favoriteProducts,
        login,
        logout,
        toggleFavorite,
        getProductById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};