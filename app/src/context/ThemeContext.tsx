import {createContext, ReactNode, useContext, useState} from 'react';

export type TTheme = {
  background: string;
  primary: string;
  secondary: string;
  muted: string;
  white: string;
  border: string;
  danger: string;
};

const LightTheme: TTheme = {
  background: '#FFFFFF',
  primary: '#FE7E00',
  secondary: '#1D2A44',
  muted: '#5B6E95',
  white: '#FFFFFF',
  border: '#D0DAEE',
  danger: '#dc3545',
};

const DarkTheme: TTheme = {
  background: '#121212',
  primary: '#FE7E00',
  secondary: '#1D2A44',
  muted: '#adb5bd',
  white: '#FFFFFF',
  border: '#D0DAEE',
  danger: '#f44336',
};

type TContextTheme = {
  theme: TTheme;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<TContextTheme | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? DarkTheme : LightTheme;

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, isDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): TContextTheme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
