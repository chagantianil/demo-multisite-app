/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {extendTheme} from '@salesforce/retail-react-app/app/components/shared/ui'
import {overrides as baseOverrides} from '@salesforce/retail-react-app/app/theme'
import refArchTheme from './sites/refarch'
import myStoreTheme from './sites/my-store'

/**
 * Get site-specific theme configuration
 * @param {string} siteId - The site ID (e.g., 'RefArch', 'my-store')
 * @returns {object} Site theme configuration object
 */
const getSiteTheme = (siteId) => {
    switch (siteId) {
        case 'RefArch':
            return refArchTheme
        case 'my-store':
            return myStoreTheme
        default:
            return refArchTheme
    }
}

/**
 * Create theme configuration for a specific site
 *
 * This function:
 * 1. Loads site-specific theme (colors, components, foundations)
 * 2. Merges with shared foundations
 * 3. Merges with base retail-react-app theme
 * 4. Returns complete Chakra UI theme
 *
 * @param {string} siteId - The site ID to get theme for (default: 'RefArch')
 * @returns {object} Complete Chakra UI theme configuration
 */
export const createTheme = (siteId = 'RefArch') => {
    const siteTheme = getSiteTheme(siteId)

    const themeOverrides = {
        ...baseOverrides,
        colors: {
            ...baseOverrides.colors,
            ...siteTheme.colors
        },
        styles: siteTheme.styles || baseOverrides.styles,
        textStyles: siteTheme.textStyles || baseOverrides.textStyles,
        layerStyles: siteTheme.layerStyles || baseOverrides.layerStyles,
        fonts: siteTheme.fonts || baseOverrides.fonts,
        fontWeights: siteTheme.fontWeights || baseOverrides.fontWeights,
        fontSizes: siteTheme.fontSizes || baseOverrides.fontSizes,
        lineHeights: siteTheme.lineHeights || baseOverrides.lineHeights,
        components: {
            ...baseOverrides.components,
            ...siteTheme.components
        }
    }

    return extendTheme(themeOverrides)
}

export default createTheme('RefArch')
