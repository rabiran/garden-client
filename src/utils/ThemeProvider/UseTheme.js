 
import React from 'react';
import themeCtx from './ThemeContext';

export default function useTheme () {
    return React.useContext(themeCtx)
}