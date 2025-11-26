/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Text Style Variants - All Opt-In
 * 
 * These styles do NOT override defaults. Use them explicitly:
 * 
 * Body Text:
 *   <Text textStyle="extraSmall">Small text</Text>
 *   <Text textStyle="large">Large text</Text>
 * 
 * Brand Headings:
 *   <Heading textStyle="brandH1">Heading 1</Heading>
 *   <Heading textStyle="brandH2">Heading 2</Heading>
 * 
 * Brand Links:
 *   <Link textStyle="brandLink">Click here</Link>
 * 
 * Display:
 *   <Text textStyle="displayLarge">Big Display Text</Text>
 */

const textStyles = {
    // ============================================
    // Body Text Variants
    // ============================================
    extraSmall: {
        fontSize: '0.625rem',    // 10px
        lineHeight: '1rem',      // 16px
        fontWeight: 'normal',
        letterSpacing: '0.01em'
    },
    small: {
        fontSize: '0.75rem',     // 12px
        lineHeight: '1.125rem',  // 18px
        fontWeight: 'normal',
        letterSpacing: '0.01em'
    },
    medium: {
        fontSize: '0.875rem',    // 14px
        lineHeight: '1.25rem',   // 20px
        fontWeight: 'normal',
        letterSpacing: '0'
    },
    base: {
        fontSize: '1rem',        // 16px
        lineHeight: '1.5rem',    // 24px
        fontWeight: 'normal',
        letterSpacing: '0'
    },
    large: {
        fontSize: '1.125rem',    // 18px
        lineHeight: '1.75rem',   // 28px
        fontWeight: 'normal',
        letterSpacing: '-0.01em'
    },
    extraLarge: {
        fontSize: '1.25rem',     // 20px
        lineHeight: '1.875rem',  // 30px
        fontWeight: 'normal',
        letterSpacing: '-0.01em'
    },

    // ============================================
    // Brand Heading Styles (Opt-In)
    // ============================================
    brandH1: {
        fontSize: {base: '2rem', md: '2.5rem', lg: '3rem'},
        lineHeight: {base: '2.5rem', md: '3rem', lg: '3.5rem'},
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
        color: 'gray.900'
    },
    brandH2: {
        fontSize: {base: '1.5rem', md: '1.875rem', lg: '2.25rem'},
        lineHeight: {base: '2rem', md: '2.25rem', lg: '2.75rem'},
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
        color: 'gray.900'
    },
    brandH3: {
        fontSize: {base: '1.25rem', md: '1.5rem', lg: '1.875rem'},
        lineHeight: {base: '1.75rem', md: '2rem', lg: '2.25rem'},
        fontWeight: 'semibold',
        letterSpacing: '-0.01em',
        color: 'gray.900'
    },
    brandH4: {
        fontSize: {base: '1.125rem', md: '1.25rem', lg: '1.5rem'},
        lineHeight: {base: '1.5rem', md: '1.75rem', lg: '2rem'},
        fontWeight: 'semibold',
        letterSpacing: '-0.01em',
        color: 'gray.900'
    },
    brandH5: {
        fontSize: {base: '1rem', md: '1.125rem'},
        lineHeight: {base: '1.5rem', md: '1.75rem'},
        fontWeight: 'semibold',
        color: 'gray.900'
    },
    brandH6: {
        fontSize: {base: '0.875rem', md: '1rem'},
        lineHeight: {base: '1.25rem', md: '1.5rem'},
        fontWeight: 'semibold',
        color: 'gray.900'
    },

    // ============================================
    // Display/Heading Variants
    // ============================================
    displaySmall: {
        fontSize: '1.5rem',      // 24px
        lineHeight: '2rem',      // 32px
        fontWeight: 'bold',
        letterSpacing: '-0.02em'
    },
    displayMedium: {
        fontSize: '2rem',        // 32px
        lineHeight: '2.5rem',    // 40px
        fontWeight: 'bold',
        letterSpacing: '-0.02em'
    },
    displayLarge: {
        fontSize: '2.5rem',      // 40px
        lineHeight: '3rem',      // 48px
        fontWeight: 'bold',
        letterSpacing: '-0.02em'
    },
    displayExtraLarge: {
        fontSize: '3rem',        // 48px
        lineHeight: '3.5rem',    // 56px
        fontWeight: 'bold',
        letterSpacing: '-0.02em'
    },

    // ============================================
    // Label Variants
    // ============================================
    labelSmall: {
        fontSize: '0.625rem',    // 10px
        lineHeight: '1rem',
        fontWeight: 'medium',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
    },
    labelMedium: {
        fontSize: '0.75rem',     // 12px
        lineHeight: '1.125rem',
        fontWeight: 'medium',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
    },
    labelLarge: {
        fontSize: '0.875rem',    // 14px
        lineHeight: '1.25rem',
        fontWeight: 'medium',
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
    },

    // ============================================
    // Brand Link Style (Opt-In)
    // ============================================
    brandLink: {
        color: 'brand.500',
        textDecoration: 'none',
        fontWeight: 'medium',
        _hover: {
            color: 'brand.600',
            textDecoration: 'underline'
        }
    },
    brandLinkUnderline: {
        color: 'brand.500',
        textDecoration: 'underline',
        fontWeight: 'medium',
        _hover: {
            color: 'brand.600',
            textDecoration: 'none'
        }
    },

    // ============================================
    // Caption/Helper Text
    // ============================================
    caption: {
        fontSize: '0.75rem',     // 12px
        lineHeight: '1rem',
        fontWeight: 'normal',
        color: 'gray.500'
    },
    captionError: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: 'normal',
        color: 'error.500'
    },
    captionSuccess: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
        fontWeight: 'normal',
        color: 'success.500'
    },

    // ============================================
    // Price Styles
    // ============================================
    priceRegular: {
        fontSize: '1rem',
        fontWeight: 'semibold',
        color: 'gray.900'
    },
    priceSale: {
        fontSize: '1rem',
        fontWeight: 'semibold',
        color: 'error.500'
    },
    priceStrikethrough: {
        fontSize: '0.875rem',
        fontWeight: 'normal',
        color: 'gray.500',
        textDecoration: 'line-through'
    },
    priceLarge: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'gray.900'
    }
}

export default textStyles
