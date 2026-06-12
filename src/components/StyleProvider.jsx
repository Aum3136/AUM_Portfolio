import React, { createContext, useContext } from 'react';

const StyleContext = createContext(null);

export const styleTheme = {
  colors: {
    sage: '#4A5D4E',
    oatmeal: '#F4F1EA',
    terracotta: '#D46A43',
    charcoal: '#1E1E1E',
  },
  typography: {
    sans: 'font-sans',
    serif: 'font-serif',
  }
};

export function StyleProvider({ children }) {
  return (
    <StyleContext.Provider value={styleTheme}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
}
