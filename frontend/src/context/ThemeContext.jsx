import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'os-group-theme';

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // localStorage may be unavailable
  }

  // Respect the user's operating-system preference
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  const isDark = theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);

    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage is optional
    }
  }, [theme, isDark]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const setLightMode = () => setTheme('light');
  const setDarkMode = () => setTheme('dark');

  const value = useMemo(
    () => ({
      theme,
      isDark,
      toggleTheme,
      setLightMode,
      setDarkMode,
    }),
    [theme, isDark]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider.');
  }

  return context;
}

export default ThemeContext;