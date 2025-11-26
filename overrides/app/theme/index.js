/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {extendTheme} from '@salesforce/retail-react-app/app/components/shared/ui'

// Import base theme overrides
import {overrides as baseOverrides} from '@salesforce/retail-react-app/app/theme'

// ============================================
// Custom Foundations
// ============================================
import customColors from './foundations/colors'
import styles from './foundations/styles'
import textStyles from './foundations/textStyles'
import layerStyles from './foundations/layerStyles'
import {fonts, fontWeights, fontSizes, lineHeights} from './foundations/fonts'

// ============================================
// Custom Component Styles
// ============================================
import Button from './components/button'

/**
 * Custom Theme Configuration
 * 
 * This extends the base Retail React App theme with custom:
 * - Colors
 * - Fonts (with @font-face)
 * - Text styles/variants
 * - Component styles (Button, etc.)
 * 
 * Usage:
 * - Colors: color="brand.500", bg="neutral.100"
 * - Text Styles: textStyle="extraSmall", textStyle="large"
 * - Buttons: <Button variant="primary" size="lg">
 */
export const overrides = {
    ...baseOverrides,

    // Merge colors (deep merge to preserve base colors like gray, blue, etc.)
    colors: {
        ...baseOverrides.colors,
        ...customColors
    },

    // Foundations
    styles,
    textStyles,
    layerStyles,
    fonts,
    fontWeights,
    fontSizes,
    lineHeights,

    // Component styles
    components: {
        ...baseOverrides.components,
        Button
    }
}

export default extendTheme(overrides)
