/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import {Icon} from '@chakra-ui/react'

// Re-export ALL icons from the base retail-react-app
// This ensures all icons used by the base app are still available
export * from '@salesforce/retail-react-app/app/components/icons'

// ============================================
// CUSTOM ICONS / ALIASES
// These provide additional icons or aliases for the style guide
// ============================================

// Cart Icon (alias for BasketIcon with different style)
export const CartIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0-3l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1v2h2l3.6 7.59L3.62 17H19v-2H7z"
        />
    </Icon>
)

// Heart Outline Icon
export const HeartOutlineIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
        />
    </Icon>
)

// Menu/Hamburger Icon
export const MenuIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </Icon>
)

// Trash/Delete Icon
export const TrashIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        />
    </Icon>
)

// Arrow Right Icon
export const ArrowRightIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"
        />
    </Icon>
)

// Arrow Left Icon
export const ArrowLeftIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        />
    </Icon>
)

// Minus Icon
export const MinusIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path fill="currentColor" d="M19 13H5v-2h14v2z" />
    </Icon>
)
