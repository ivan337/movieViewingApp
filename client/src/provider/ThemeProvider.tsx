import {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
    useCallback,
} from 'react';

import {
    DefaultTheme,
    ThemeProvider as StyledThemeProvider,
} from 'styled-components';

interface ThemeContextValue {
    theme: DefaultTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({
    children,
    darkTheme,
    lightTheme,
}: {
    children: ReactNode;
    darkTheme: DefaultTheme;
    lightTheme: DefaultTheme;
}) => {
    const getInitialTheme = useCallback(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const cacheThemeId = localStorage.getItem('theme');
            return cacheThemeId === darkTheme.id ? darkTheme : lightTheme;
        }
        return lightTheme;
    }, [darkTheme, lightTheme]);

    const [theme, setTheme] = useState(getInitialTheme);

    const toggleTheme = useCallback(() => {
        const currentTheme = theme.id === darkTheme.id ? lightTheme : darkTheme;
        setTheme(currentTheme);

        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('theme', currentTheme.id);
        }
    }, [darkTheme, lightTheme, theme.id]);

    useEffect(() => {
        setTheme(getInitialTheme());
    }, [getInitialTheme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export { ThemeProvider };
