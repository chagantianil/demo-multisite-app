/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Global Color Palette
 * 
 * Usage in components:
 * - color="brand.500"
 * - bg="primary.100"
 * - borderColor="neutral.300"
 * 
 * TODO: Replace these placeholder values with your design team's colors
 */

const colors = {
    // Primary Brand Colors
    brand: {
        50: '#E6F0FF',
        100: '#CCE0FF',
        200: '#99C2FF',
        300: '#66A3FF',
        400: '#3385FF',
        500: '#0066FF',  // Primary brand color
        600: '#0052CC',
        700: '#003D99',
        800: '#002966',
        900: '#001433'
    },

    // Secondary Colors
    secondary: {
        50: '#FFF5E6',
        100: '#FFEBCC',
        200: '#FFD699',
        300: '#FFC266',
        400: '#FFAD33',
        500: '#FF9900',  // Secondary color
        600: '#CC7A00',
        700: '#995C00',
        800: '#663D00',
        900: '#331F00'
    },

    // Neutral/Gray Colors
    neutral: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827'
    },

    // Success Colors
    success: {
        50: '#ECFDF5',
        100: '#D1FAE5',
        200: '#A7F3D0',
        300: '#6EE7B7',
        400: '#34D399',
        500: '#10B981',
        600: '#059669',
        700: '#047857',
        800: '#065F46',
        900: '#064E3B'
    },

    // Warning Colors
    warning: {
        50: '#FFFBEB',
        100: '#FEF3C7',
        200: '#FDE68A',
        300: '#FCD34D',
        400: '#FBBF24',
        500: '#F59E0B',
        600: '#D97706',
        700: '#B45309',
        800: '#92400E',
        900: '#78350F'
    },

    // Error/Danger Colors
    error: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D'
    },

    // Info Colors
    info: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A'
    },

    // Background Colors
    background: {
        primary: '#FFFFFF',
        secondary: '#F9FAFB',
        tertiary: '#F3F4F6'
    },

    // Text Colors
    text: {
        primary: '#111827',
        secondary: '#4B5563',
        tertiary: '#9CA3AF',
        inverse: '#FFFFFF'
    },

    // Border Colors
    border: {
        light: '#E5E7EB',
        default: '#D1D5DB',
        dark: '#9CA3AF'
    }
}

export default colors

