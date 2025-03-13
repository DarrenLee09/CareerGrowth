import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Always use light theme for now due to dark mode bugs
    const [theme] = useState<Theme>('light');

    useEffect(() => {
        // Force light mode
        localStorage.setItem('theme', 'light');
        // Update document for light theme
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add('light');
        // Set data-theme attribute for CSS variables
        document.documentElement.setAttribute('data-theme', 'light');
    }, []);

    // No-op toggle function - doesn't actually change the theme
    const toggleTheme = () => {
        console.log('Theme toggling disabled temporarily');
        // Do nothing - theme remains light
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}; 