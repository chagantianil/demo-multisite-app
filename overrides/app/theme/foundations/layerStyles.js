/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Layer Styles - Reusable style presets for containers and layouts
 * 
 * Usage:
 * <Box layerStyle="page">Page content</Box>
 * <Box layerStyle="card">Card content</Box>
 */

const layerStyles = {
    // ============================================
    // Page Layout Styles
    // ============================================
    
    // Main page container
    page: {
        maxWidth: '1440px',
        mx: 'auto',
        px: {base: 4, md: 6, lg: 8},
        py: {base: 4, md: 6}
    },

    // Narrow page (for articles, forms)
    pageNarrow: {
        maxWidth: '768px',
        mx: 'auto',
        px: {base: 4, md: 6},
        py: {base: 4, md: 6}
    },

    // Wide page (full width content)
    pageWide: {
        maxWidth: '1920px',
        mx: 'auto',
        px: {base: 4, md: 6, lg: 8},
        py: {base: 4, md: 6}
    },

    // Full bleed (edge to edge)
    pageFullBleed: {
        width: '100%',
        px: 0,
        py: 0
    },

    // ============================================
    // Section Styles
    // ============================================

    // Standard section
    section: {
        py: {base: 8, md: 12, lg: 16}
    },

    // Section with background
    sectionAlt: {
        py: {base: 8, md: 12, lg: 16},
        bg: 'gray.50'
    },

    // Hero section
    sectionHero: {
        py: {base: 12, md: 16, lg: 24},
        minHeight: {base: '400px', md: '500px'},
        display: 'flex',
        alignItems: 'center'
    },

    // ============================================
    // Card Styles
    // ============================================

    // Basic card
    card: {
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'md',
        p: {base: 4, md: 6}
    },

    // Card with hover effect
    cardHover: {
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'md',
        p: {base: 4, md: 6},
        transition: 'all 0.2s ease-in-out',
        _hover: {
            boxShadow: 'lg',
            transform: 'translateY(-4px)'
        }
    },

    // Outlined card
    cardOutline: {
        bg: 'white',
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'gray.200',
        p: {base: 4, md: 6}
    },

    // Flat card (no shadow)
    cardFlat: {
        bg: 'gray.50',
        borderRadius: 'lg',
        p: {base: 4, md: 6}
    },

    // ============================================
    // Content Styles
    // ============================================

    // Centered content
    contentCentered: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    // Two column layout
    contentTwoCol: {
        display: 'grid',
        gridTemplateColumns: {base: '1fr', md: 'repeat(2, 1fr)'},
        gap: {base: 4, md: 6, lg: 8}
    },

    // Three column layout
    contentThreeCol: {
        display: 'grid',
        gridTemplateColumns: {base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'},
        gap: {base: 4, md: 6}
    },

    // Four column layout
    contentFourCol: {
        display: 'grid',
        gridTemplateColumns: {base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)'},
        gap: {base: 4, md: 6}
    },

    // Sidebar layout (main + sidebar)
    contentWithSidebar: {
        display: 'grid',
        gridTemplateColumns: {base: '1fr', lg: '1fr 300px'},
        gap: {base: 4, md: 6, lg: 8}
    },

    // ============================================
    // Special Containers
    // ============================================

    // Glass effect
    glass: {
        bg: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        p: {base: 4, md: 6}
    },

    // Gradient background
    gradientPrimary: {
        bgGradient: 'linear(to-r, brand.500, brand.700)',
        color: 'white',
        borderRadius: 'lg',
        p: {base: 4, md: 6}
    },

    // Alert/Banner style
    banner: {
        py: 3,
        px: 4,
        bg: 'brand.50',
        borderLeft: '4px solid',
        borderColor: 'brand.500',
        borderRadius: 'md'
    },

    // Feature highlight
    feature: {
        p: {base: 6, md: 8},
        bg: 'white',
        borderRadius: 'xl',
        boxShadow: 'lg',
        textAlign: 'center'
    },

    // Divider with text
    divider: {
        display: 'flex',
        alignItems: 'center',
        _before: {
            content: '""',
            flex: 1,
            borderBottom: '1px solid',
            borderColor: 'gray.200'
        },
        _after: {
            content: '""',
            flex: 1,
            borderBottom: '1px solid',
            borderColor: 'gray.200'
        }
    },

    // ============================================
    // Focus Styles (Opt-In)
    // ============================================
    brandFocus: {
        _focusVisible: {
            outline: '2px solid',
            outlineColor: 'brand.500',
            outlineOffset: '2px'
        }
    },

    // ============================================
    // Selection Styles (Opt-In)
    // ============================================
    brandSelection: {
        '::selection': {
            backgroundColor: 'brand.100',
            color: 'brand.900'
        }
    },

    // ============================================
    // Input/Form Styles (Opt-In)
    // ============================================
    brandInput: {
        borderColor: 'gray.300',
        borderRadius: 'md',
        _hover: {
            borderColor: 'gray.400'
        },
        _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)'
        },
        _invalid: {
            borderColor: 'error.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-error-500)'
        }
    },

    // ============================================
    // Interactive Item Styles (Opt-In)
    // ============================================
    brandListItem: {
        py: 3,
        px: 4,
        cursor: 'pointer',
        transition: 'background 0.2s',
        _hover: {
            bg: 'gray.50'
        },
        _active: {
            bg: 'gray.100'
        }
    },
    brandListItemSelected: {
        py: 3,
        px: 4,
        bg: 'brand.50',
        borderLeft: '3px solid',
        borderColor: 'brand.500',
        cursor: 'pointer'
    },

    // ============================================
    // Badge/Tag Styles (Opt-In)
    // ============================================
    brandBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        px: 2,
        py: 0.5,
        fontSize: '0.75rem',
        fontWeight: 'medium',
        borderRadius: 'full',
        bg: 'brand.100',
        color: 'brand.800'
    },
    brandBadgeSuccess: {
        display: 'inline-flex',
        alignItems: 'center',
        px: 2,
        py: 0.5,
        fontSize: '0.75rem',
        fontWeight: 'medium',
        borderRadius: 'full',
        bg: 'success.100',
        color: 'success.800'
    },
    brandBadgeWarning: {
        display: 'inline-flex',
        alignItems: 'center',
        px: 2,
        py: 0.5,
        fontSize: '0.75rem',
        fontWeight: 'medium',
        borderRadius: 'full',
        bg: 'warning.100',
        color: 'warning.800'
    },
    brandBadgeError: {
        display: 'inline-flex',
        alignItems: 'center',
        px: 2,
        py: 0.5,
        fontSize: '0.75rem',
        fontWeight: 'medium',
        borderRadius: 'full',
        bg: 'error.100',
        color: 'error.800'
    },

    // ============================================
    // Overlay Styles (Opt-In)
    // ============================================
    brandOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'blackAlpha.600',
        zIndex: 'overlay'
    },

    // ============================================
    // Skeleton/Loading Styles (Opt-In)
    // ============================================
    brandSkeleton: {
        bg: 'gray.100',
        borderRadius: 'md',
        animation: 'pulse 2s infinite'
    }
}

export default layerStyles

