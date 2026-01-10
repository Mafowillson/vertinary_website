# Language & Theme Features

## Overview

The website now automatically detects and uses:
1. **System Language** - Detects user's browser/system language preference
2. **System Theme** - Detects user's dark/light mode preference

Both preferences are saved to localStorage and can be manually overridden.

## Features

### 🌍 Language Detection

- **Automatic Detection**: Uses `navigator.language` to detect system language
- **Supported Languages**:
  - French (fr) - Default
  - English (en)
- **Fallback**: If system language is not supported, defaults to French
- **Persistence**: Language preference saved in localStorage
- **Manual Override**: Users can change language via the language selector in the header

### 🌓 Theme Detection

- **Automatic Detection**: Uses `prefers-color-scheme` media query
- **Supported Themes**:
  - Light mode
  - Dark mode
- **System Sync**: Listens for system theme changes (if no manual preference set)
- **Persistence**: Theme preference saved in localStorage
- **Manual Override**: Users can toggle theme via the theme toggle button in the header

## Implementation Details

### Language Context (`LanguageContext.jsx`)

```javascript
const { language, setLanguage, t, currentLanguage } = useLanguage()

// Usage
<h1>{t('home')}</h1>
```

- `language`: Current language code ('fr' or 'en')
- `setLanguage(code)`: Change language
- `t(key)`: Translation function
- `currentLanguage`: Current language object with code, name, and flag

### Theme Context (`ThemeContext.jsx`)

```javascript
const { theme, toggleTheme, setTheme, isDark } = useTheme()

// Usage
<div className={isDark ? 'dark-mode-class' : 'light-mode-class'}>
```

- `theme`: Current theme ('light' or 'dark')
- `toggleTheme()`: Toggle between light/dark
- `setTheme(theme)`: Set specific theme
- `isDark`: Boolean for dark mode check

### Components

1. **LanguageSelector** - Dropdown to select language (in header)
2. **ThemeToggle** - Button to toggle theme (in header)

## Usage in Components

### Using Translations

```jsx
import { useLanguage } from '../contexts/LanguageContext'

function MyComponent() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('welcomeMessage')}</p>
    </div>
  )
}
```

### Using Theme

```jsx
import { useTheme } from '../contexts/ThemeContext'

function MyComponent() {
  const { isDark } = useTheme()
  
  return (
    <div className="bg-white dark:bg-gray-800">
      <p className="text-gray-900 dark:text-gray-100">
        Content
      </p>
    </div>
  )
}
```

## Dark Mode Classes

Tailwind CSS dark mode is enabled using the `dark:` prefix:

```jsx
// Example
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
```

Common dark mode patterns:
- Backgrounds: `bg-white dark:bg-gray-800`
- Text: `text-gray-900 dark:text-gray-100`
- Borders: `border-gray-300 dark:border-gray-700`
- Buttons: Use existing `.btn-primary` and `.btn-secondary` classes (already support dark mode)

## Adding New Translations

To add a new translation key:

1. Open `src/contexts/LanguageContext.jsx`
2. Add the key to both `translations.fr` and `translations.en` objects
3. Use `t('yourKey')` in your components

Example:
```javascript
const translations = {
  fr: {
    // ... existing
    newKey: 'Nouvelle clé',
  },
  en: {
    // ... existing
    newKey: 'New Key',
  },
}
```

## Adding New Languages

To add a new language:

1. Add to `SUPPORTED_LANGUAGES`:
```javascript
export const SUPPORTED_LANGUAGES = {
  // ... existing
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
  },
}
```

2. Add translations object:
```javascript
const translations = {
  // ... existing
  es: {
    home: 'Inicio',
    products: 'Productos',
    // ... all keys
  },
}
```

3. Update `getSystemLanguage()` to detect the new language

## User Experience

### First Visit
- Language: Detected from system, defaults to French if unsupported
- Theme: Detected from system preference

### Returning Users
- Language: Loaded from localStorage
- Theme: Loaded from localStorage

### Manual Changes
- Users can change language/theme anytime via header controls
- Changes are immediately saved to localStorage
- Changes persist across sessions

### System Changes
- If user hasn't manually set a preference, theme follows system changes
- Language doesn't auto-update (requires manual selection)

## Technical Notes

- Both contexts use `useEffect` to sync with system preferences
- Theme uses `matchMedia` listener for real-time system theme changes
- All preferences stored in localStorage for persistence
- Dark mode uses Tailwind's `class` strategy (adds `dark` class to `<html>`)
- All components are updated to support dark mode styling

