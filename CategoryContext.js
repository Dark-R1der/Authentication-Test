// CategoryContext.js

import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("c1");

  const setCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategoryId, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};
