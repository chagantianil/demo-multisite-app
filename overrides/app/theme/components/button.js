/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Button Component Styles - Custom Variants Only
 * 
 * These variants are ADDED to the existing Chakra button variants.
 * Default buttons (solid, outline, ghost, link) remain unchanged.
 * 
 * Custom Variants Usage:
 * <Button variant="brandPrimary">Primary CTA</Button>
 * <Button variant="brandSecondary">Secondary</Button>
 * <Button variant="brandOutline">Outlined</Button>
 * <Button variant="brandGhost">Ghost</Button>
 * <Button variant="brandDanger">Delete</Button>
 * 
 * Custom Sizes Usage:
 * <Button size="xs2">Extra Small</Button>
 * <Button size="xl2">Extra Large</Button>
 */

const Button = {
    // Custom size variations (added to existing xs, sm, md, lg)
    sizes: {
        // Extra extra small
        xs2: {
            fontSize: '0.625rem',   // 10px
            px: 2,                  // 8px
            py: 0.5,                // 2px
            height: '24px',
            minWidth: '50px'
        },
        // Extra large
        xl: {
            fontSize: '1.125rem',   // 18px
            px: 6,                  // 24px
            py: 2.5,                // 10px
            height: '48px',
            minWidth: '120px'
        },
        // Extra extra large
        xl2: {
            fontSize: '1.25rem',    // 20px
            px: 8,                  // 32px
            py: 3,                  // 12px
            height: '56px',
            minWidth: '140px'
        }
    },

    // Custom variant styles (ADDED to existing solid, outline, ghost, link)
    variants: {
        // ============================================
        // Brand Primary - Main CTA button
        // ============================================
        brandPrimary: {
            bg: 'brand.500',
            color: 'white',
            fontWeight: 'semibold',
            borderRadius: 'md',
            _hover: {
                bg: 'brand.600',
                transform: 'translateY(-1px)',
                boxShadow: 'md',
                _disabled: {
                    bg: 'brand.500',
                    transform: 'none',
                    boxShadow: 'none'
                }
            },
            _active: {
                bg: 'brand.700',
                transform: 'translateY(0)',
                boxShadow: 'sm'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        },

        // ============================================
        // Brand Secondary - Less prominent actions
        // ============================================
        brandSecondary: {
            bg: 'secondary.500',
            color: 'white',
            fontWeight: 'semibold',
            borderRadius: 'md',
            _hover: {
                bg: 'secondary.600',
                transform: 'translateY(-1px)',
                boxShadow: 'md',
                _disabled: {
                    bg: 'secondary.500',
                    transform: 'none'
                }
            },
            _active: {
                bg: 'secondary.700',
                transform: 'translateY(0)'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        },

        // ============================================
        // Brand Outline - Border only
        // ============================================
        brandOutline: {
            bg: 'transparent',
            color: 'brand.500',
            fontWeight: 'semibold',
            borderRadius: 'md',
            border: '2px solid',
            borderColor: 'brand.500',
            _hover: {
                bg: 'brand.50',
                borderColor: 'brand.600',
                color: 'brand.600',
                _disabled: {
                    bg: 'transparent'
                }
            },
            _active: {
                bg: 'brand.100',
                borderColor: 'brand.700'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        },

        // ============================================
        // Brand Ghost - Minimal style
        // ============================================
        brandGhost: {
            bg: 'transparent',
            color: 'brand.500',
            fontWeight: 'semibold',
            borderRadius: 'md',
            _hover: {
                bg: 'brand.50',
                _disabled: {
                    bg: 'transparent'
                }
            },
            _active: {
                bg: 'brand.100'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        },

        // ============================================
        // Brand Link - Looks like a link
        // ============================================
        brandLink: {
            bg: 'transparent',
            color: 'brand.500',
            fontWeight: 'medium',
            padding: 0,
            height: 'auto',
            minWidth: 'auto',
            textDecoration: 'underline',
            _hover: {
                color: 'brand.600',
                textDecoration: 'none'
            },
            _active: {
                color: 'brand.700'
            }
        },

        // ============================================
        // Brand Danger - Destructive actions
        // ============================================
        brandDanger: {
            bg: 'error.500',
            color: 'white',
            fontWeight: 'semibold',
            borderRadius: 'md',
            _hover: {
                bg: 'error.600',
                transform: 'translateY(-1px)',
                boxShadow: 'md',
                _disabled: {
                    bg: 'error.500',
                    transform: 'none'
                }
            },
            _active: {
                bg: 'error.700',
                transform: 'translateY(0)'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        },

        // ============================================
        // Brand Neutral - Gray button
        // ============================================
        brandNeutral: {
            bg: 'neutral.200',
            color: 'neutral.800',
            fontWeight: 'semibold',
            borderRadius: 'md',
            _hover: {
                bg: 'neutral.300',
                _disabled: {
                    bg: 'neutral.200'
                }
            },
            _active: {
                bg: 'neutral.400'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        },

        // ============================================
        // Brand Success - Positive actions
        // ============================================
        brandSuccess: {
            bg: 'success.500',
            color: 'white',
            fontWeight: 'semibold',
            borderRadius: 'md',
            _hover: {
                bg: 'success.600',
                transform: 'translateY(-1px)',
                boxShadow: 'md'
            },
            _active: {
                bg: 'success.700',
                transform: 'translateY(0)'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        },

        // ============================================
        // Brand Warning - Warning actions
        // ============================================
        brandWarning: {
            bg: 'warning.500',
            color: 'white',
            fontWeight: 'semibold',
            borderRadius: 'md',
            _hover: {
                bg: 'warning.600',
                transform: 'translateY(-1px)',
                boxShadow: 'md'
            },
            _active: {
                bg: 'warning.700',
                transform: 'translateY(0)'
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed'
            }
        }
    }
}

export default Button
