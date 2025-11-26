/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Custom Fonts Configuration
 * 
 * Font files should be placed in: overrides/app/static/fonts/
 * 
 * Font weight mapping:
 * - 100: Thin
 * - 200: Extra Light
 * - 300: Light
 * - 400: Regular/Normal
 * - 500: Medium
 * - 600: Semi Bold
 * - 700: Bold
 * - 800: Extra Bold
 * - 900: Black
 */

// Font family names used throughout the app
export const fonts = {
    heading: '"CustomFont", system-ui, sans-serif',
    body: '"CustomFont", system-ui, sans-serif',
    mono: 'Menlo, monospace'
}

// Font weights mapping
export const fontWeights = {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
}

// Font sizes
export const fontSizes = {
    '2xs': '0.625rem',   // 10px
    xs: '0.75rem',       // 12px
    sm: '0.875rem',      // 14px
    md: '1rem',          // 16px
    lg: '1.125rem',      // 18px
    xl: '1.25rem',       // 20px
    '2xl': '1.5rem',     // 24px
    '3xl': '1.875rem',   // 30px
    '4xl': '2.25rem',    // 36px
    '5xl': '3rem',       // 48px
    '6xl': '3.75rem'     // 60px
}

// Line heights
export const lineHeights = {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
}

export default {fonts, fontWeights, fontSizes, lineHeights}

